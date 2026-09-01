// src/lib/actions/auth.ts
"use server";


import prisma from "@/lib/prisma";
// bcryptjs, non bcrypt: quest'ultimo e' un addon nativo (.node) e su
// Cloudflare Workers non esiste dlopen, quindi il modulo esplodeva in
// produzione mentre in locale su Node funzionava. Stessa API, stesso
// formato di hash ($2b$): nessuna password da rigenerare.
import bcrypt from "bcryptjs";

export async function adminPreCheck(formData: { email?: string; password?: string }) {
  const { email, password } = formData;
  
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        roles: true,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      isValid: true,
      roles: user.roles.map((r: { name: string }) => r.name),
      isSuperAdmin: user.roles.some((r: { name: string }) => r.name === "SUPERADMIN")
    };
  } catch (error) {
    console.error("[adminPreCheck] Error:", error);
    throw error;
  }
}

