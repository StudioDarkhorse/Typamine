"use server";

import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// bcryptjs, non bcrypt: quest'ultimo e' un addon nativo (.node) e su
// Cloudflare Workers non esiste dlopen, quindi il modulo esplodeva in
// produzione mentre in locale su Node funzionava. Stessa API, stesso
// formato di hash ($2b$): nessuna password da rigenerare.
import bcrypt from "bcryptjs";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import crypto from "crypto";

// Ruoli che identificano un super admin. La vecchia protezione confrontava una
// email hardcoded ("admin@angkorfloat.com") ereditata da un altro progetto: non
// corrispondeva a nessun utente di Typamine, quindi proteggeva un account
// inesistente e lasciava scoperto quello vero. Il ruolo regge anche se
// l'indirizzo cambia.
const PROTECTED_ROLES = ["SUPERADMIN", "ADMIN"];

function isProtectedUser(user: { roles?: { name: string }[] } | null) {
  return !!user?.roles?.some((role) => PROTECTED_ROLES.includes(role.name));
}

async function checkPermission(permission: string) {
  const session = await getServerAuthSession();
  const permissions = session?.user?.permissions || [];
  const roles = session?.user?.roles || [];
  const isSuperAdmin = roles.includes("SUPERADMIN") || roles.includes("ADMIN");

  if (!isSuperAdmin && !permissions.includes(permission)) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getUsers() {
  await checkPermission("user:read");
  return prisma.user.findMany({
    include: {
      roles: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteUser(id: string) {
  const session = await checkPermission("user:delete");
  
  if (!session?.user || session.user.id === id) {
    throw new Error("You cannot delete your own account.");
  }

  // Don't allow deleting the last superadmin if we can check that
  const user = await prisma.user.findUnique({
    where: { id },
    include: { roles: true }
  });
  
  if (isProtectedUser(user)) {
    throw new Error("Super admins cannot be deleted.");
  }

  // No Cloudflare R2 cleanup needed since we store as binary inside SQLite db

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function saveUser(prevState: any, formData: FormData, id?: string) {
  const session = await getServerAuthSession();
  if (!session?.user) return "Unauthorized";
  
  try {
    if (id) {
      await checkPermission("user:update");

      // Un super admin lo puo' modificare solo lui stesso: bloccarlo per
      // chiunque, se stesso incluso, renderebbe impossibile cambiargli
      // password o avatar e, con un solo admin, non ci sarebbe piu' modo di
      // rientrare in possesso dell'account.
      const target = await prisma.user.findUnique({
        where: { id },
        include: { roles: true },
      });
      if (isProtectedUser(target) && session.user.id !== id) {
        return "Super admins can only be edited by themselves.";
      }
    } else {
      await checkPermission("user:create");
    }

    const email = formData.get("email") as string;
    const name = formData.get("name") as string | null;
    const surname = formData.get("surname") as string | null;
    const biography = formData.get("biography") as string | null;
    const password = formData.get("password") as string | null;
    const passwordConfirm = formData.get("passwordConfirm") as string | null;
    const roleId = formData.get("roleId") as string;
    const removeImage = formData.get("removeImage") === "true";
    const imageFile = formData.get("image") as File | null;
    const hasNewImage = imageFile && imageFile.size > 0;

    if (!id && (!password || password.length < 6)) {
      return "Password must be at least 6 characters long.";
    }

    if (password && password !== passwordConfirm) {
      return "Passwords do not match.";
    }

    // Fetch existing user to check for previous image for clean up
    let existingUser: { imageUrl: string | null } | null = null;
    if (id) {
      existingUser = await prisma.user.findUnique({
        where: { id },
        select: { imageUrl: true },
      });
    }

    const userId = id || crypto.randomUUID();
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

    const data = {
      email,
      name,
      surname,
      biography,
      ...(passwordHash ? { password: passwordHash } : {}),
    };

    let user;
    if (id) {
      user = await prisma.user.update({
        where: { id },
        data: {
          ...data,
          roles: {
            set: [{ id: roleId }]
          }
        },
      });
    } else {
      // Check if user already exists
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new Error("User with this email already exists.");
      }

      user = await prisma.user.create({
        data: {
          id: userId,
          ...data,
          password: passwordHash || "", // password is required on create
          roles: {
            connect: [{ id: roleId }]
          }
        },
      });
    }

    // Now handle image changes (R2 Upload/Delete)
    let finalImageUrl: string | null | undefined = undefined;
    let uploadedKey: string | null = null;

    try {
      if (removeImage) {
        finalImageUrl = null;
        await prisma.user.update({
          where: { id: user.id },
          data: { imageUrl: null }
        });
        if (existingUser?.imageUrl) {
          try {
            await deleteFromR2(existingUser.imageUrl);
          } catch (cleanupError) {
            console.warn("Failed to delete old image from R2:", cleanupError);
          }
        }
      } else if (hasNewImage) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const extension = imageFile.name.split('.').pop() || 'jpg';
        const timestamp = Date.now();
        const finalFileName = `${user.id}-${timestamp}.${extension}`;
        
        const { url, key } = await uploadToR2(
          buffer,
          "users/images",
          finalFileName,
          imageFile.type
        );
        finalImageUrl = url;
        uploadedKey = key;

        await prisma.user.update({
          where: { id: user.id },
          data: { imageUrl: url }
        });

        // Clean up old image
        if (existingUser?.imageUrl) {
          try {
            await deleteFromR2(existingUser.imageUrl);
          } catch (cleanupError) {
            console.warn("Failed to delete old image from R2:", cleanupError);
          }
        }
      }
    } catch (r2Error) {
      // Rollback database user creation if it was a new record
      if (!id) {
        try {
          await prisma.user.delete({ where: { id: user.id } });
        } catch (dbDeleteError) {
          console.error("Critical: failed to roll back user creation after R2 upload error:", dbDeleteError);
        }
      } else {
        // Rollback: if we uploaded a file to R2 before it failed during db update
        if (uploadedKey) {
          try {
            await deleteFromR2(uploadedKey);
          } catch (cleanupError) {
            console.error("Critical: failed to delete uploaded file from R2 after DB error:", cleanupError);
          }
        }
      }
      throw r2Error;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage === "NEXT_REDIRECT") throw error;
    console.error("[User Action] Error saving user:", error);
    return errorMessage || "Failed to save user.";
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}
