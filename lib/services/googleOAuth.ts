// OAuth2 "Authorization Code" flow verso Google, usato solo per la
// connessione Gmail in Admin Communication (scope gmail.send). Tutto via
// fetch HTTPS puro (nessun SDK) — compatibile col runtime Cloudflare Workers
// usato in produzione (niente socket TCP grezzi come richiederebbe SMTP).
const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
  scope: string;
  token_type: string;
}

// Costruisce l'URL di consenso Google — access_type=offline + prompt=consent
// forzano il rilascio di un refresh_token anche se l'admin ha già autorizzato
// l'app in passato (altrimenti Google lo omette dalle richieste successive).
export function buildGoogleAuthUrl(params: { clientId: string; redirectUri: string; state: string }): string {
  const url = new URL(GOOGLE_AUTH_ENDPOINT);
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", `${GMAIL_SEND_SCOPE} openid email`);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", params.state);
  return url.toString();
}

export async function exchangeCodeForTokens(params: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<GoogleTokenResponse> {
  const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: params.code,
      client_id: params.clientId,
      client_secret: params.clientSecret,
      redirect_uri: params.redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google token exchange failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res.json();
}

export async function refreshAccessToken(params: {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
}): Promise<{ access_token: string; expires_in: number }> {
  const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: params.refreshToken,
      client_id: params.clientId,
      client_secret: params.clientSecret,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google token refresh failed (${res.status}): ${body.slice(0, 300)}`);
  }
  return res.json();
}

// Decodifica (senza verifica firma — arriva diretto da Google via HTTPS nello
// stesso scambio del token, non da input utente) il payload del JWT id_token
// per estrarre l'email dell'account Gmail appena connesso.
export function decodeIdTokenEmail(idToken: string | undefined): string | undefined {
  if (!idToken) return undefined;
  try {
    const payloadB64 = idToken.split(".")[1];
    const json = Buffer.from(payloadB64, "base64").toString("utf8");
    const payload = JSON.parse(json);
    return typeof payload.email === "string" ? payload.email : undefined;
  } catch {
    return undefined;
  }
}
