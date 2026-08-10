// Invio email transazionale reale via Gmail API (users.messages.send), non
// SMTP: il deploy gira su Cloudflare Workers, che non espone socket TCP
// grezzi come richiederebbe una libreria SMTP tipo nodemailer — la Gmail API
// è HTTPS puro (fetch), quindi compatibile col runtime edge senza pacchetti
// aggiuntivi. Usa il refresh_token salvato da /api/oauth/gmail/callback dopo
// il consenso OAuth2 in Admin Communication.
import prisma from "@/lib/prisma";
import { withSafeDbQuery } from "./dbMigration";
import { ADMIN_SETTINGS_ID } from "./adminSettings";
import { refreshAccessToken } from "./googleOAuth";

export class EmailNotConfiguredError extends Error {
  constructor(message = "Gmail is not connected in Admin Communication settings.") {
    super(message);
    this.name = "EmailNotConfiguredError";
  }
}

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Codifica RFC 2822 minimale + base64url (richiesto dalla Gmail API al posto
// del base64 standard) — evitiamo una dipendenza MIME esterna per un caso
// d'uso così semplice (singolo destinatario, solo html+text opzionale).
function buildRawMessage(input: SendEmailInput & { from: string; fromName?: string }): string {
  const boundary = `typamine_${Date.now()}`;
  const fromHeader = input.fromName ? `${input.fromName} <${input.from}>` : input.from;
  const lines = [
    `From: ${fromHeader}`,
    `To: ${input.to}`,
    `Subject: =?UTF-8?B?${Buffer.from(input.subject, "utf8").toString("base64")}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    input.text || input.html.replace(/<[^>]+>/g, ""),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    input.html,
    "",
    `--${boundary}--`,
  ];
  const raw = lines.join("\r\n");
  return Buffer.from(raw, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendGmailEmail(input: SendEmailInput): Promise<void> {
  const record = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({
      where: { id: ADMIN_SETTINGS_ID },
      select: {
        gmailConnected: true,
        gmailConnectedEmail: true,
        gmailClientId: true,
        gmailClientSecret: true,
        gmailRefreshToken: true,
        gmailSenderName: true,
      },
    })
  );

  if (
    !record?.gmailConnected ||
    !record.gmailRefreshToken ||
    !record.gmailClientId ||
    !record.gmailClientSecret ||
    !record.gmailConnectedEmail
  ) {
    throw new EmailNotConfiguredError();
  }

  const { access_token } = await refreshAccessToken({
    refreshToken: record.gmailRefreshToken,
    clientId: record.gmailClientId,
    clientSecret: record.gmailClientSecret,
  });

  const raw = buildRawMessage({
    ...input,
    from: record.gmailConnectedEmail,
    fromName: record.gmailSenderName || undefined,
  });

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Gmail send failed (${res.status}): ${body.slice(0, 300)}`);
  }
}
