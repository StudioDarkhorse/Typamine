import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cacheTags";
import { withSafeDbQuery } from "@/lib/services/dbMigration";
import { ADMIN_SETTINGS_ID } from "@/lib/services/adminSettings";
import { exchangeCodeForTokens, decodeIdTokenEmail } from "@/lib/services/googleOAuth";

// Callback dell'OAuth2 "Authorization Code" flow avviato dal bottone
// "Connect with Google" in Admin Communication. Lo stesso admin che ha
// avviato il flow deve essere ancora loggato al ritorno da Google — è il
// nostro CSRF guard al posto di un cookie state dedicato (coerente con
// l'accesso admin già protetto dal salt segreto in proxy.ts).
function redirectToSettings(origin: string, status: "connected" | "error", detail?: string) {
  const url = new URL("/admin/settings", origin);
  url.searchParams.set("gmail", status);
  if (detail) url.searchParams.set("detail", detail);
  const res = NextResponse.redirect(url);
  res.cookies.delete("gmail_oauth_state");
  return res;
}

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  const permissions = session?.user?.permissions || [];
  const roles = session?.user?.roles || [];
  const isSuperAdmin = roles.includes("SUPERADMIN") || roles.includes("ADMIN");
  if (!session || (!isSuperAdmin && !permissions.includes("setting:update"))) {
    return redirectToSettings(req.nextUrl.origin, "error", "unauthorized");
  }

  const code = req.nextUrl.searchParams.get("code");
  const oauthError = req.nextUrl.searchParams.get("error");
  if (oauthError) return redirectToSettings(req.nextUrl.origin, "error", oauthError);
  if (!code) return redirectToSettings(req.nextUrl.origin, "error", "missing_code");

  const state = req.nextUrl.searchParams.get("state");
  const expectedState = req.cookies.get("gmail_oauth_state")?.value;
  if (!state || !expectedState || state !== expectedState) {
    return redirectToSettings(req.nextUrl.origin, "error", "state_mismatch");
  }

  try {
    const existing = await withSafeDbQuery(() =>
      prisma.adminSettings.findUnique({
        where: { id: ADMIN_SETTINGS_ID },
        select: { gmailClientId: true, gmailClientSecret: true },
      })
    );

    if (!existing?.gmailClientId || !existing?.gmailClientSecret) {
      return redirectToSettings(req.nextUrl.origin, "error", "missing_client_credentials");
    }

    const redirectUri = `${req.nextUrl.origin}/api/oauth/gmail/callback`;
    const tokens = await exchangeCodeForTokens({
      code,
      clientId: existing.gmailClientId,
      clientSecret: existing.gmailClientSecret,
      redirectUri,
    });

    if (!tokens.refresh_token) {
      // Google omette refresh_token se l'app era già autorizzata senza
      // prompt=consent — non dovrebbe succedere (lo forziamo in buildGoogleAuthUrl)
      // ma se capita non abbiamo modo di rinfrescare i token in futuro.
      return redirectToSettings(req.nextUrl.origin, "error", "no_refresh_token");
    }

    const email = decodeIdTokenEmail(tokens.id_token) || "";

    await withSafeDbQuery(() =>
      prisma.adminSettings.update({
        where: { id: ADMIN_SETTINGS_ID },
        data: {
          gmailConnected: true,
          gmailConnectedEmail: email || undefined,
          gmailRefreshToken: tokens.refresh_token,
        },
      })
    );

    revalidatePath("/admin/settings");
    revalidateTag(CACHE_TAGS.adminSettings, "max");

    return redirectToSettings(req.nextUrl.origin, "connected");
  } catch (error) {
    console.error("[Gmail OAuth Callback] Error:", error);
    return redirectToSettings(req.nextUrl.origin, "error", "exchange_failed");
  }
}
