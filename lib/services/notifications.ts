// Dispatch reale per gli eventi del tab Notifications — legge il canale
// configurato (off|email|slack|both) per un evento e spedisce davvero sul
// canale scelto. Nessun producer di eventi esiste ancora nel codebase (niente
// form di contatto, registrazione pubblica o coda digest settimanale), quindi
// oggi questo modulo è invocato solo dal pulsante "Send Test" in admin — ma è
// la stessa funzione che una futura feature (contact form, ecc.) chiamerebbe.
import prisma from "@/lib/prisma";
import { withSafeDbQuery } from "./dbMigration";
import { ADMIN_SETTINGS_ID } from "./adminSettings";
import { sendTemplateMail } from "./email";
import { NotificationChannel, NotificationChannels } from "@/types";

export class SlackNotConfiguredError extends Error {
  constructor(message = "Slack webhook URL is not set in Notifications settings.") {
    super(message);
    this.name = "SlackNotConfiguredError";
  }
}

export async function sendSlackNotification(text: string): Promise<void> {
  const record = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID }, select: { slackWebhookUrl: true } })
  );

  if (!record?.slackWebhookUrl) throw new SlackNotConfiguredError();

  const res = await fetch(record.slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Slack webhook failed (${res.status}): ${body.slice(0, 300)}`);
  }
}

// Instrada un evento verso il canale configurato in AdminSettings.notificationChannels.
// Nessun destinatario email dedicato esiste nello schema per le notifiche
// (solo per GDPR requests) — in mancanza di un campo apposito, il canale
// email si appoggia sulla stessa casella Gmail connessa in Admin
// Communication (gmailConnectedEmail), coerente con team piccoli a inbox unica.
export async function notifyEvent(eventKey: keyof NotificationChannels, subject: string, message: string): Promise<void> {
  const record = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({
      where: { id: ADMIN_SETTINGS_ID },
      select: { notificationChannels: true, gmailConnectedEmail: true },
    })
  );

  let channels: NotificationChannels = {};
  try {
    channels = record?.notificationChannels ? JSON.parse(record.notificationChannels) : {};
  } catch {
    channels = {};
  }

  const channel: NotificationChannel = channels[eventKey] || "off";
  if (channel === "off") return;

  const wantsSlack = channel === "slack" || channel === "both";
  const wantsEmail = channel === "email" || channel === "both";

  if (wantsSlack) await sendSlackNotification(`*${subject}*\n${message}`);
  if (wantsEmail && record?.gmailConnectedEmail) {
    // Template condiviso invece di HTML inline: stesso layout/branding di
    // tutte le altre mail di sistema, e `subject` qui fa da `title` (il
    // template lo interpola sia nell'oggetto che nel titolo del corpo).
    await sendTemplateMail({
      to: record.gmailConnectedEmail,
      template: "notification",
      args: { title: subject, message },
    });
  }
}
