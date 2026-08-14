"use server";

import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { withSafeDbQuery } from "@/lib/services/dbMigration";

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

export async function getAdminStatistics() {
  await checkPermission("font:read");

  return withSafeDbQuery(async () => {
    // 1. Fetch fonts license type distribution
    const fonts = await prisma.ingredient.findMany({
      select: { licenseType: true },
    });

    const licenseCounts: Record<string, number> = {
      "Free": 0,
      "Open Source (SIL OFL)": 0,
      "Free for Personal Use": 0,
      "Public Domain": 0,
      "Demo": 0,
      "Donationware": 0,
      "Commercial": 0,
      "Not Defined": 0,
    };

    fonts.forEach((font) => {
      const type = font.licenseType;
      if (!type || type.trim() === "" || type === "Unknown (AI Checked)") {
        licenseCounts["Not Defined"]++;
      } else if (type === "Free" || type === "100% Free") {
        licenseCounts["Free"]++;
      } else if (type === "Open Source (SIL OFL)" || type === "OFL" || type === "SIL OFL" || type === "Open Source") {
        licenseCounts["Open Source (SIL OFL)"]++;
      } else if (type === "Free for Personal Use") {
        licenseCounts["Free for Personal Use"]++;
      } else if (type === "Public Domain") {
        licenseCounts["Public Domain"]++;
      } else if (type === "Demo") {
        licenseCounts["Demo"]++;
      } else if (type === "Donationware") {
        licenseCounts["Donationware"]++;
      } else if (type === "Commercial") {
        licenseCounts["Commercial"]++;
      } else {
        licenseCounts["Not Defined"]++;
      }
    });

    // 2. Fetch author statistics in a single flat query to bypass any SQLite/D1 quirks
    const authors = await prisma.fontAuthor.findMany({
      select: { email: true, isVerified: true },
    });

    let realEmailCount = 0;
    let verifiedCount = 0;

    authors.forEach((author) => {
      if (author.isVerified) {
        verifiedCount++;
      }
      const email = author.email;
      if (email && email.trim() !== "" && !email.endsWith(".typamine.internal")) {
        realEmailCount++;
      }
    });

    return {
      licenses: licenseCounts,
      authors: {
        total: authors.length,
        realEmail: realEmailCount,
        verified: verifiedCount,
      },
    };
  });
}
