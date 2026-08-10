import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { withSafeDbQuery } from "@/lib/services/dbMigration";
import { ADMIN_SETTINGS_ID } from "@/lib/services/adminSettings";
import { buildGoogleAuthUrl } from "@/lib/services/googleOAuth";

// Punto di ingresso del bottone "Connect with Google" — server-side così
// buildGoogleAuthUrl (che vive in lib/services/googleOAuth.ts insieme a
// funzioni che usano Buffer/fetch server-only) non deve mai essere importato
// da un client component. redirect_uri è calcolato dallo stesso origin della
// richiesta, identico a quello usato dal callback.
export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  const permissions = session?.user?.permissions || [];
  const roles = session?.user?.roles || [];
  const isSuperAdmin = roles.includes("SUPERADMIN") || roles.includes("ADMIN");
  if (!session || (!isSuperAdmin && !permissions.includes("setting:update"))) {
    return NextResponse.redirect(new URL("/admin/settings", req.nextUrl.origin));
  }

  const existing = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID }, select: { gmailClientId: true } })
  );

  if (!existing?.gmailClientId) {
    const url = new URL("/admin/settings", req.nextUrl.origin);
    url.searchParams.set("gmail", "error");
    url.searchParams.set("detail", "missing_client_id");
    return NextResponse.redirect(url);
  }

  const state = crypto.randomUUID();
  const redirectUri = `${req.nextUrl.origin}/api/oauth/gmail/callback`;
  const authUrl = buildGoogleAuthUrl({ clientId: existing.gmailClientId, redirectUri, state });

  const res = NextResponse.redirect(authUrl);
  res.cookies.set("gmail_oauth_state", state, { httpOnly: true, maxAge: 600, path: "/" });
  return res;
}
