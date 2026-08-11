import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { withSafeDbQuery } from "./dbMigration";
import { ADMIN_SETTINGS_ID } from "./adminSettings";
import { refreshAccessToken } from "./googleOAuth";
import { renderEmailTemplate, htmlToPlainText, EmailTemplateArgs } from "./emailTemplates";

// Invio email di sistema. Due provider, scelti da AdminSettings.emailProvider:
//
//  - "smtp"        -> nodemailer su un server SMTP qualunque (incluso Gmail
//                     con app password). Configurato interamente da
//                     /admin/settings, non da variabili d'ambiente: le
//                     credenziali stanno nella stessa riga singleton di tutto
//                     il resto della configurazione, modificabili senza deploy.
//  - "gmail_oauth2" -> Gmail API via HTTPS (users.messages.send), col
//                     refresh_token ottenuto dal consenso OAuth2.
//
// NOTA SUL DEPLOY: nodemailer apre socket TCP, che il runtime Cloudflare
// Workers (dove questo progetto va in produzione, vedi open-next.config.ts)
// non espone. In pratica: SMTP funziona in locale/Node, ma su Workers solo
// il provider Gmail API — che è HTTPS puro — arriverà a destinazione. Vale la
// pena tenerlo presente prima di impostare "smtp" come provider in produzione.

export class EmailNotConfiguredError extends Error {
  constructor(message = "Outbound email is not configured in Admin Communication settings.") {
    super(message);
    this.name = "EmailNotConfiguredError";
  }
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

type EmailSettings = {
  emailProvider: string;
  gmailConnected: boolean;
  gmailConnectedEmail: string | null;
  gmailClientId: string | null;
  gmailClientSecret: string | null;
  gmailRefreshToken: string | null;
  gmailSenderName: string | null;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUser: string | null;
  smtpPassword: string | null;
  smtpSecure: boolean | null;
  smtpFromEmail: string | null;
  smtpFromName: string | null;
  smtpAuthType: string | null;
  smtpOauthClientId: string | null;
  smtpOauthClientSecret: string | null;
  smtpOauthRefreshToken: string | null;
  smtpOauthAccessUrl: string | null;
  resendApiKey: string | null;
  resendFromEmail: string | null;
  resendFromName: string | null;
};

async function loadEmailSettings(): Promise<EmailSettings> {
  const record = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({
      where: { id: ADMIN_SETTINGS_ID },
      select: {
        emailProvider: true,
        gmailConnected: true,
        gmailConnectedEmail: true,
        gmailClientId: true,
        gmailClientSecret: true,
        gmailRefreshToken: true,
        gmailSenderName: true,
        smtpHost: true,
        smtpPort: true,
        smtpUser: true,
        smtpPassword: true,
        smtpSecure: true,
        smtpFromEmail: true,
        smtpFromName: true,
        smtpAuthType: true,
        smtpOauthClientId: true,
        smtpOauthClientSecret: true,
        smtpOauthRefreshToken: true,
        smtpOauthAccessUrl: true,
        resendApiKey: true,
        resendFromEmail: true,
        resendFromName: true,
      },
    })
  );

  if (!record) throw new EmailNotConfiguredError("No admin settings saved yet.");
  return record as EmailSettings;
}

// ---------------------------------------------------------------------------
// SMTP (nodemailer)
// ---------------------------------------------------------------------------
// Non logghiamo mai password/secret/token: solo la loro PRESENZA e lunghezza,
// che è quanto serve a capire "il campo è arrivato vuoto" vs "è sbagliato".
function describeSecret(value: string | null | undefined): string {
  if (!value) return "MISSING";
  return `set (${value.length} chars)`;
}

function maskEmail(value: string | null | undefined): string {
  if (!value) return "MISSING";
  const [user, domain] = value.split("@");
  if (!domain) return `${value.slice(0, 2)}***`;
  return `${user.slice(0, 2)}***@${domain}`;
}

async function sendViaSmtp(input: SendEmailInput, settings: EmailSettings): Promise<void> {
  if (!settings.smtpHost || !settings.smtpUser) {
    throw new EmailNotConfiguredError("SMTP host and username are required.");
  }

  const isOauth2 = settings.smtpAuthType === "oauth2";

  console.log(
    `[Email/SMTP] Config → host=${settings.smtpHost} port=${settings.smtpPort ?? 587} secure=${settings.smtpSecure} ` +
      `authType=${settings.smtpAuthType || "password"} user=${maskEmail(settings.smtpUser)} ` +
      `password=${describeSecret(settings.smtpPassword)} ` +
      `oauthClientId=${describeSecret(settings.smtpOauthClientId)} ` +
      `oauthClientSecret=${describeSecret(settings.smtpOauthClientSecret)} ` +
      `oauthRefreshToken=${describeSecret(settings.smtpOauthRefreshToken)} ` +
      `oauthAccessUrl=${settings.smtpOauthAccessUrl || "(default: Google)"}`
  );

  // XOAUTH2: nodemailer si procura da sé un access token a partire dal
  // refresh token, chiamando `accessUrl` (endpoint token del provider —
  // Google se non specificato; per Microsoft/Outlook va indicato il proprio).
  // In questa modalità smtpPassword non viene nemmeno letto.
  // Tipo locale invece di indicizzare TransportOptions: quel tipo dei
  // @types/nodemailer non espone `auth`, quindi TransportOptions["auth"] non
  // compila. L'oggetto viene comunque passato a createTransport con un cast.
  let auth: Record<string, string>;
  if (isOauth2) {
    if (!settings.smtpOauthClientId || !settings.smtpOauthClientSecret || !settings.smtpOauthRefreshToken) {
      throw new EmailNotConfiguredError("OAuth2 requires client ID, client secret and refresh token.");
    }
    auth = {
      type: "OAuth2",
      user: settings.smtpUser,
      clientId: settings.smtpOauthClientId,
      clientSecret: settings.smtpOauthClientSecret,
      refreshToken: settings.smtpOauthRefreshToken,
      ...(settings.smtpOauthAccessUrl ? { accessUrl: settings.smtpOauthAccessUrl } : {}),
    };
  } else {
    if (!settings.smtpPassword) {
      throw new EmailNotConfiguredError("SMTP password (or app password) is required.");
    }
    auth = { user: settings.smtpUser, pass: settings.smtpPassword };
  }

  const port = settings.smtpPort || 587;
  const secure = settings.smtpSecure ?? port === 465;

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port,
    // `secure` va coerente con la porta: 465 = TLS implicito, 587 = STARTTLS
    // (quindi secure:false, la cifratura viene negoziata dopo la connessione).
    // Forzare secure:true su 587 fa fallire l'handshake con un timeout opaco.
    secure,
    auth,
    // Log SMTP completi (comandi/risposte del server) verso la console del
    // server: sono l'unico modo per distinguere un rifiuto di autenticazione
    // da un problema di rete/TLS senza tirare a indovinare.
    logger: true,
    debug: true,
  } as nodemailer.TransportOptions);

  // verify() distingue "credenziali/host sbagliati" da "messaggio rifiutato":
  // senza, un errore di configurazione arriverebbe come un generico fallimento
  // di invio, molto più difficile da diagnosticare dal pannello admin.
  console.log(`[Email/SMTP] Verifying connection to ${settings.smtpHost}:${port} (secure=${secure})...`);
  try {
    await transporter.verify();
    console.log("[Email/SMTP] Connection verified, credentials accepted.");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Email/SMTP] verify() failed:", message);

    // 535 5.7.139 = il server ha DISATTIVATO l'autenticazione SMTP di base
    // per quella casella (policy Microsoft, non credenziali sbagliate): con
    // un app password non si passerà mai, serve OAuth2. Senza questo
    // suggerimento l'errore grezzo manda a caccia della password sbagliata.
    if (/5\.7\.139|SmtpClientAuthentication is disabled/i.test(message)) {
      throw new Error(
        "SMTP basic authentication is disabled for this mailbox by the mail provider (Microsoft error 5.7.139). " +
          "An app password cannot work here — switch Authentication to OAuth 2.0, or enable SMTP AUTH for the mailbox. " +
          `Server said: ${message}`
      );
    }
    throw new Error(`SMTP connection failed: ${message}`);
  }

  const fromEmail = settings.smtpFromEmail || settings.smtpUser;
  console.log(`[Email/SMTP] Sending "${input.subject}" from ${maskEmail(fromEmail)} to ${maskEmail(input.to)}...`);

  try {
    const info = await transporter.sendMail({
      from: settings.smtpFromName ? `"${settings.smtpFromName}" <${fromEmail}>` : fromEmail,
      to: input.to,
      subject: input.subject,
      text: input.text || htmlToPlainText(input.html),
      html: input.html,
    });
    console.log(
      `[Email/SMTP] Sent — messageId=${info.messageId} accepted=${JSON.stringify(info.accepted)} ` +
        `rejected=${JSON.stringify(info.rejected)} response=${info.response}`
    );
  } catch (err) {
    console.error("[Email/SMTP] sendMail() failed:", err instanceof Error ? err.message : err);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Resend (API HTTP)
// ---------------------------------------------------------------------------
const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Corpo della richiesta a POST /emails, meno i campi mittente/destinatario. */
type ResendPayload =
  | { subject: string; html: string; text: string }
  // I template creati nella dashboard Resend: `id` è l'id o l'alias del
  // template PUBBLICATO, `variables` popola i segnaposto definiti lì dentro.
  // ATTENZIONE: l'API rifiuta la richiesta se insieme a `template` arrivano
  // anche html/text/react — sono mutuamente esclusivi.
  | { template: { id: string; variables?: Record<string, string> }; subject?: string };

/** Chiamata condivisa a POST /emails: auth, logging ed errori in un posto solo. */
async function resendRequest(payload: ResendPayload, settings: EmailSettings, to: string): Promise<void> {
  if (!settings.resendApiKey) {
    throw new EmailNotConfiguredError("Resend API key is required.");
  }
  if (!settings.resendFromEmail) {
    throw new EmailNotConfiguredError("Resend sender address is required.");
  }

  const from = settings.resendFromName
    ? `${settings.resendFromName} <${settings.resendFromEmail}>`
    : settings.resendFromEmail;

  const isTemplate = "template" in payload;
  console.log(
    `[Email/Resend] Config → from=${maskEmail(settings.resendFromEmail)} ` +
      `fromName=${settings.resendFromName || "(none)"} apiKey=${describeSecret(settings.resendApiKey)}`
  );
  console.log(
    `[Email/Resend] POST ${RESEND_ENDPOINT} → to=${maskEmail(to)} ` +
      (isTemplate
        ? `template=${payload.template.id} variables=${JSON.stringify(Object.keys(payload.template.variables ?? {}))}`
        : `subject="${payload.subject}"`)
  );

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${settings.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], ...payload }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Email/Resend] Request failed:", message);
    throw new Error(`Resend request failed: ${message}`);
  }

  const bodyText = await res.text().catch(() => "");

  if (!res.ok) {
    console.error(`[Email/Resend] HTTP ${res.status}:`, bodyText.slice(0, 500));

    // Resend restituisce un JSON con `message` leggibile: mostrarlo così
    // com'è evita di far indovinare all'admin cosa è andato storto (dominio
    // non verificato, chiave revocata, destinatario non permesso in sandbox...).
    let detail = bodyText.slice(0, 300);
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed?.message) detail = parsed.message;
    } catch {
      // corpo non JSON: resta il testo grezzo troncato sopra
    }
    throw new Error(`Resend send failed (${res.status}): ${detail}`);
  }

  let id = "unknown";
  try {
    id = JSON.parse(bodyText)?.id ?? "unknown";
  } catch {
    // 2xx senza JSON valido: l'invio è comunque andato, l'id è solo diagnostico
  }
  console.log(`[Email/Resend] Sent — id=${id}`);
}

async function sendViaResend(input: SendEmailInput, settings: EmailSettings): Promise<void> {
  await resendRequest(
    {
      subject: input.subject,
      html: input.html,
      text: input.text || htmlToPlainText(input.html),
    },
    settings,
    input.to
  );
}

export interface ResendTemplate {
  id: string;
  name: string;
  alias: string | null;
  status: string;
}

/**
 * Elenca i template presenti sull'account Resend (GET /templates).
 *
 * Pagina fino in fondo: l'API ne restituisce max 100 per volta e segnala con
 * `has_more` se ce ne sono altri, quindi una singola chiamata darebbe una
 * lista silenziosamente troncata a chi ha più template di così.
 */
export async function listResendTemplates(): Promise<ResendTemplate[]> {
  const settings = await loadEmailSettings();
  if (!settings.resendApiKey) {
    throw new EmailNotConfiguredError("Resend API key is required to list templates.");
  }

  const all: ResendTemplate[] = [];
  let after: string | undefined;
  // Guardia anti-loop: se l'API tornasse sempre has_more:true senza avanzare
  // (bug lato loro o risposta inattesa), meglio fermarsi che ciclare all'infinito.
  for (let page = 0; page < 20; page++) {
    const url = new URL("https://api.resend.com/templates");
    url.searchParams.set("limit", "100");
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${settings.resendApiKey}` },
    });

    const bodyText = await res.text().catch(() => "");
    if (!res.ok) {
      console.error(`[Email/Resend] List templates failed (${res.status}):`, bodyText.slice(0, 300));
      let detail = bodyText.slice(0, 200);
      try {
        const parsed = JSON.parse(bodyText);
        if (parsed?.message) detail = parsed.message;
      } catch {
        // corpo non JSON: resta il testo grezzo
      }
      throw new Error(`Resend list templates failed (${res.status}): ${detail}`);
    }

    let parsed: { data?: ResendTemplate[]; has_more?: boolean };
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      throw new Error("Resend returned a non-JSON response while listing templates.");
    }

    const batch = parsed.data ?? [];
    all.push(...batch);
    if (!parsed.has_more || batch.length === 0) break;
    after = batch[batch.length - 1]?.id;
    if (!after) break;
  }

  console.log(`[Email/Resend] Listed ${all.length} template(s).`);
  return all;
}

/**
 * Invia un template creato nella DASHBOARD di Resend (diverso dai template
 * locali in /email-templates, che sono file HTML nostri renderizzati qui e
 * spediti come corpo già composto — vedi sendTemplateMail).
 *
 * @param templateId id o alias del template pubblicato su Resend
 * @param variables valori dei segnaposto definiti nel template
 * @param subject opzionale: se passato ha la precedenza sull'oggetto di
 *        default del template. Va fornito solo se il template non ne
 *        definisce uno proprio, altrimenti Resend rifiuta la richiesta.
 *
 * Nota: non passa dal provider configurato in AdminSettings — è per
 * definizione una feature Resend, quindi richiede solo che la API key sia
 * salvata, anche se il provider attivo per le mail di sistema è un altro.
 */
export async function sendResendTemplateMail({
  to,
  templateId,
  variables,
  subject,
}: {
  to: string;
  templateId: string;
  variables?: Record<string, string>;
  subject?: string;
}): Promise<void> {
  const settings = await loadEmailSettings();
  await resendRequest(
    { template: { id: templateId, ...(variables ? { variables } : {}) }, ...(subject ? { subject } : {}) },
    settings,
    to
  );
}

// ---------------------------------------------------------------------------
// Gmail API (HTTPS, nessun socket TCP: unico provider compatibile con Workers)
// ---------------------------------------------------------------------------

// Codifica RFC 2822 minimale + base64url (richiesto dalla Gmail API al posto
// del base64 standard) — evitiamo una dipendenza MIME esterna per un caso
// d'uso così semplice (singolo destinatario, solo html+text).
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
    input.text || htmlToPlainText(input.html),
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

async function sendViaGmail(input: SendEmailInput, settings: EmailSettings): Promise<void> {
  if (
    !settings.gmailConnected ||
    !settings.gmailRefreshToken ||
    !settings.gmailClientId ||
    !settings.gmailClientSecret ||
    !settings.gmailConnectedEmail
  ) {
    throw new EmailNotConfiguredError("Gmail is not connected in Admin Communication settings.");
  }

  console.log(`[Email/Gmail] Refreshing access token for ${maskEmail(settings.gmailConnectedEmail)}...`);
  const { access_token } = await refreshAccessToken({
    refreshToken: settings.gmailRefreshToken,
    clientId: settings.gmailClientId,
    clientSecret: settings.gmailClientSecret,
  });
  console.log("[Email/Gmail] Access token obtained.");

  const raw = buildRawMessage({
    ...input,
    from: settings.gmailConnectedEmail,
    fromName: settings.gmailSenderName || undefined,
  });

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[Email/Gmail] send failed (${res.status}):`, body.slice(0, 300));
    throw new Error(`Gmail send failed (${res.status}): ${body.slice(0, 300)}`);
  }

  console.log(`[Email/Gmail] Sent to ${maskEmail(input.to)}`);
}

// ---------------------------------------------------------------------------
// API pubblica
// ---------------------------------------------------------------------------

/** Invia una mail già composta, col provider configurato in admin. */
export async function sendMail(input: SendEmailInput): Promise<void> {
  const settings = await loadEmailSettings();
  console.log(`[Email] Provider="${settings.emailProvider}" → sending "${input.subject}" to ${maskEmail(input.to)}`);

  if (settings.emailProvider === "resend") {
    await sendViaResend(input, settings);
    return;
  }
  if (settings.emailProvider === "smtp") {
    await sendViaSmtp(input, settings);
    return;
  }
  if (settings.emailProvider === "gmail_oauth2") {
    await sendViaGmail(input, settings);
    return;
  }
  throw new EmailNotConfiguredError(`Email provider "${settings.emailProvider}" is not implemented yet.`);
}

/**
 * Invia una mail a partire da un template di /email-templates: subject e
 * corpo vengono entrambi interpolati con `args` (vedi emailTemplates.ts).
 */
export async function sendTemplateMail({
  to,
  template,
  args = {},
  subjectOverride,
}: {
  to: string;
  template: string;
  args?: EmailTemplateArgs;
  subjectOverride?: string;
}): Promise<void> {
  const { subject, html, text } = renderEmailTemplate(template, args, subjectOverride);
  await sendMail({ to, subject, html, text });
}

/** Provider attivo, in forma leggibile — usato nei messaggi di esito in admin. */
export async function getActiveEmailProviderLabel(): Promise<string> {
  const settings = await loadEmailSettings();
  const labels: Record<string, string> = {
    resend: "Resend",
    smtp: "SMTP",
    gmail_oauth2: "Gmail (OAuth 2.0)",
  };
  return labels[settings.emailProvider] ?? settings.emailProvider;
}

// Retrocompatibilità: prima esisteva solo sendGmailEmail, richiamata da
// lib/services/notifications.ts e dalle action admin. Ora l'invio passa dal
// provider configurato, ma il nome resta valido come alias per non spargere
// il cambiamento su tutti i chiamanti.
export const sendGmailEmail = sendMail;
