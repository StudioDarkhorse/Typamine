"use server";

import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cacheTags";
import { withSafeDbQuery } from "@/lib/services/dbMigration";
import { ADMIN_SETTINGS_ID, DEFAULT_ADMIN_SETTINGS, mapAdminSettings } from "@/lib/services/adminSettings";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import {
  sendTemplateMail,
  sendResendTemplateMail,
  listResendTemplates,
  getActiveEmailProviderLabel,
  EmailNotConfiguredError,
  type ResendTemplate,
} from "@/lib/services/email";
import { sendSlackNotification, SlackNotConfiguredError } from "@/lib/services/notifications";
import {
  AdminSettings,
  CredentialEntry,
  HeroWordmarkFontConfig,
  IntegrationsConfig,
  MarqueeType,
  NotificationChannels,
  PopupFrequency,
  SmtpAuthType,
} from "@/types";

const MARQUEE_TYPES: MarqueeType[] = ["every_page", "homepage_top", "homepage_banner"];
const POPUP_FREQUENCIES: PopupFrequency[] = ["first_visit", "every_visit", "periodic"];
const SMTP_AUTH_TYPES: SmtpAuthType[] = ["password", "oauth2"];
const MAX_HERO_WORDMARK_FONTS = 12;

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

function str(formData: FormData, key: string): string | null {
  const v = (formData.get(key) as string)?.trim();
  return v || null;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "true";
}

function int(formData: FormData, key: string, fallback: number): number {
  const v = parseInt((formData.get(key) as string) || "", 10);
  return Number.isFinite(v) ? v : fallback;
}

function float(formData: FormData, key: string, fallback: number): number {
  const v = parseFloat((formData.get(key) as string) || "");
  return Number.isFinite(v) ? v : fallback;
}

function describeError(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    return error.message || fallback;
  }
  return fallback;
}

// Lettura diretta (non cacheata) per popolare il form in /admin/settings —
// stesso motivo di getAdminTags in lib/actions/tag.ts: l'admin deve vedere
// subito il valore appena salvato, non quello cacheato per il sito pubblico.
export async function getAdminSettingsForAdmin(): Promise<AdminSettings> {
  await checkPermission("setting:read");

  const record = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID } })
  );

  if (!record) return DEFAULT_ADMIN_SETTINGS;
  return mapAdminSettings(record);
}

async function revalidateSettings(alsoPublicHome: boolean) {
  revalidatePath("/admin/settings");
  if (alsoPublicHome) revalidatePath("/");
  revalidateTag(CACHE_TAGS.adminSettings, "max");
}

// ---------------------------------------------------------------------------
// General
// ---------------------------------------------------------------------------
export async function saveGeneralSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    let heroWordmarkFonts: HeroWordmarkFontConfig[] = [];
    try {
      const raw = formData.get("heroWordmarkFontsJson") as string;
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        heroWordmarkFonts = parsed
          .filter((f) => f && typeof f === "object" && typeof f.fontId === "string" && f.fontId.trim())
          .slice(0, MAX_HERO_WORDMARK_FONTS)
          .map((f) => ({
            fontId: f.fontId.trim(),
            fontSizePercent: Number.isFinite(f.fontSizePercent) ? Math.min(150, Math.max(50, f.fontSizePercent)) : 100,
          }));
      }
    } catch {
      return "Invalid hero wordmark fonts data.";
    }

    const data = {
      siteLanguage: str(formData, "siteLanguage") || "en",
      siteTimezone: str(formData, "siteTimezone") || "UTC",
      maintenanceActive: bool(formData, "maintenanceActive"),
      maintenanceMessage: str(formData, "maintenanceMessage"),
      letterTFontFamily: str(formData, "letterTFontFamily"),
      letterTFontSizePercent: int(formData, "letterTFontSizePercent", 100),
      logoLightModeColor: str(formData, "logoLightModeColor"),
      logoDarkModeColor: str(formData, "logoDarkModeColor"),
      heroWordmarkFonts: JSON.stringify(heroWordmarkFonts),
      heroWordmarkLoop: bool(formData, "heroWordmarkLoop"),
      heroWordmarkLoopSpeed: Math.min(5, Math.max(-5, float(formData, "heroWordmarkLoopSpeed", 0))),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving general settings:", error);
    return describeError(error, "Failed to save general settings.");
  }

  await revalidateSettings(true);
  return null;
}

// ---------------------------------------------------------------------------
// Promo Website Communication — Homepage Marquee
// ---------------------------------------------------------------------------
export async function saveMarqueeSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    const marqueeTypeRaw = formData.get("marqueeType") as string;
    const data = {
      marqueeActive: bool(formData, "marqueeActive"),
      marqueeText: str(formData, "marqueeText"),
      marqueeType: MARQUEE_TYPES.includes(marqueeTypeRaw as MarqueeType) ? marqueeTypeRaw : "every_page",
      marqueeTextColor: str(formData, "marqueeTextColor"),
      marqueeBgColor: str(formData, "marqueeBgColor"),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving marquee settings:", error);
    return describeError(error, "Failed to save marquee settings.");
  }

  await revalidateSettings(true);
  return null;
}

// ---------------------------------------------------------------------------
// Promo Website Communication — Homepage Popup (image goes to R2, only the
// public URL is ever written to the DB)
// ---------------------------------------------------------------------------
export async function savePopupSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    const existing = await withSafeDbQuery(() =>
      prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID }, select: { popupImageUrl: true } })
    );

    const removeImage = bool(formData, "removePopupImage");
    const imageFile = formData.get("popupImage") as File | null;

    let popupImageUrl = existing?.popupImageUrl ?? null;

    if (removeImage && popupImageUrl) {
      try {
        await deleteFromR2(popupImageUrl);
      } catch (cleanupError) {
        console.warn("[AdminSettings Action] Failed to delete previous popup image from R2:", cleanupError);
      }
      popupImageUrl = null;
    } else if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const ext = imageFile.name.split(".").pop() || "jpg";
      const fileName = `popup-${Date.now()}.${ext}`;
      // "settings/popups/images" — percorso R2 dedicato per questo asset,
      // già dichiarato in schema.prisma accanto a popupImageUrl.
      const { url } = await uploadToR2(buffer, "settings/popups/images", fileName, imageFile.type || "image/jpeg");

      if (popupImageUrl) {
        try {
          await deleteFromR2(popupImageUrl);
        } catch (cleanupError) {
          console.warn("[AdminSettings Action] Failed to delete previous popup image from R2:", cleanupError);
        }
      }
      popupImageUrl = url;
    }

    const frequencyRaw = formData.get("popupFrequency") as string;
    const data = {
      popupActive: bool(formData, "popupActive"),
      popupImageUrl,
      popupHeadline: str(formData, "popupHeadline"),
      popupMessage: str(formData, "popupMessage"),
      popupCtaLabel: str(formData, "popupCtaLabel"),
      popupCtaLink: str(formData, "popupCtaLink"),
      popupFrequency: POPUP_FREQUENCIES.includes(frequencyRaw as PopupFrequency) ? frequencyRaw : "first_visit",
      popupFrequencyDays: int(formData, "popupFrequencyDays", 7),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving popup settings:", error);
    return describeError(error, "Failed to save popup settings.");
  }

  await revalidateSettings(true);
  return null;
}

// ---------------------------------------------------------------------------
// Admin Communication
// ---------------------------------------------------------------------------
export async function saveAdminCommunicationSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    let credentialsVault: CredentialEntry[] = [];
    try {
      const raw = formData.get("credentialsVaultJson") as string;
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        credentialsVault = parsed
          .filter((c) => c && typeof c === "object" && typeof c.label === "string")
          .map((c) => ({ id: String(c.id || crypto.randomUUID()), label: c.label.trim(), value: String(c.value ?? "") }))
          .filter((c) => c.label.length > 0);
      }
    } catch {
      return "Invalid credentials vault data.";
    }

    const data = {
      emailProvider: str(formData, "emailProvider") || "gmail_oauth2",
      gmailClientId: str(formData, "gmailClientId"),
      gmailClientSecret: str(formData, "gmailClientSecret"),
      gmailSenderName: str(formData, "gmailSenderName"),
      gmailConnected: bool(formData, "gmailConnected"),
      gmailConnectedEmail: str(formData, "gmailConnectedEmail"),
      smtpHost: str(formData, "smtpHost"),
      smtpPort: int(formData, "smtpPort", 587),
      smtpUser: str(formData, "smtpUser"),
      smtpPassword: str(formData, "smtpPassword"),
      smtpSecure: bool(formData, "smtpSecure"),
      smtpFromEmail: str(formData, "smtpFromEmail"),
      smtpFromName: str(formData, "smtpFromName"),
      smtpAuthType: SMTP_AUTH_TYPES.includes(formData.get("smtpAuthType") as SmtpAuthType)
        ? (formData.get("smtpAuthType") as string)
        : "password",
      smtpOauthClientId: str(formData, "smtpOauthClientId"),
      smtpOauthClientSecret: str(formData, "smtpOauthClientSecret"),
      smtpOauthRefreshToken: str(formData, "smtpOauthRefreshToken"),
      smtpOauthAccessUrl: str(formData, "smtpOauthAccessUrl"),
      resendApiKey: str(formData, "resendApiKey"),
      resendFromEmail: str(formData, "resendFromEmail"),
      resendFromName: str(formData, "resendFromName"),
      credentialsVault: JSON.stringify(credentialsVault),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving admin communication settings:", error);
    return describeError(error, "Failed to save admin communication settings.");
  }

  await revalidateSettings(false);
  return null;
}

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------
export async function saveIntegrationsSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    let integrationsConfig: IntegrationsConfig = {};
    try {
      const raw = formData.get("integrationsConfigJson") as string;
      const parsed = raw ? JSON.parse(raw) : {};
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        integrationsConfig = parsed;
      }
    } catch {
      return "Invalid integrations data.";
    }

    const data = { integrationsConfig: JSON.stringify(integrationsConfig) };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving integrations settings:", error);
    return describeError(error, "Failed to save integrations settings.");
  }

  await revalidateSettings(true);
  return null;
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------
export async function saveNotificationsSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    let notificationChannels: NotificationChannels = {};
    try {
      const raw = formData.get("notificationChannelsJson") as string;
      const parsed = raw ? JSON.parse(raw) : {};
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        notificationChannels = parsed;
      }
    } catch {
      return "Invalid notification channels data.";
    }

    const data = {
      notificationChannels: JSON.stringify(notificationChannels),
      slackWebhookUrl: str(formData, "slackWebhookUrl"),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving notifications settings:", error);
    return describeError(error, "Failed to save notifications settings.");
  }

  await revalidateSettings(false);
  return null;
}

// ---------------------------------------------------------------------------
// Security & Access
// ---------------------------------------------------------------------------
export async function saveSecuritySettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    const data = {
      require2fa: bool(formData, "require2fa"),
      sessionTimeoutMinutes: int(formData, "sessionTimeoutMinutes", 60),
      ipAllowlist: str(formData, "ipAllowlist"),
      auditRetentionDays: int(formData, "auditRetentionDays", 90),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving security settings:", error);
    return describeError(error, "Failed to save security settings.");
  }

  await revalidateSettings(false);
  return null;
}

// ---------------------------------------------------------------------------
// Legal & Compliance
// ---------------------------------------------------------------------------
export async function saveLegalSettings(prevState: any, formData: FormData) {
  try {
    await checkPermission("setting:update");

    const data = {
      cookieBannerActive: bool(formData, "cookieBannerActive"),
      cookieBannerText: str(formData, "cookieBannerText"),
      privacyPolicyUrl: str(formData, "privacyPolicyUrl"),
      termsOfServiceUrl: str(formData, "termsOfServiceUrl"),
      gdprRequestEmail: str(formData, "gdprRequestEmail"),
    };

    await withSafeDbQuery(() =>
      prisma.adminSettings.upsert({
        where: { id: ADMIN_SETTINGS_ID },
        create: { id: ADMIN_SETTINGS_ID, ...data },
        update: data,
      })
    );
  } catch (error) {
    console.error("[AdminSettings Action] Error saving legal settings:", error);
    return describeError(error, "Failed to save legal settings.");
  }

  await revalidateSettings(true);
  return null;
}

// ---------------------------------------------------------------------------
// Admin Communication — Gmail disconnect + live test send
// ---------------------------------------------------------------------------
export async function disconnectGmail() {
  await checkPermission("setting:update");

  await withSafeDbQuery(() =>
    prisma.adminSettings.update({
      where: { id: ADMIN_SETTINGS_ID },
      data: { gmailConnected: false, gmailConnectedEmail: null, gmailRefreshToken: null },
    })
  );

  await revalidateSettings(false);
}

/** Template disponibili sull'account Resend, per popolare la select in admin. */
export async function getResendTemplates(): Promise<{ ok: boolean; templates: ResendTemplate[]; error?: string }> {
  try {
    await checkPermission("setting:read");
    const templates = await listResendTemplates();
    return { ok: true, templates };
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) return { ok: false, templates: [], error: error.message };
    console.error("[AdminSettings Action] Error listing Resend templates:", error);
    return { ok: false, templates: [], error: describeError(error, "Failed to load Resend templates.") };
  }
}

// Invia una mail di prova alla casella dell'admin loggato — prova reale del
// round-trip col provider configurato, non solo "le credenziali sono salvate".
export async function sendTestEmail(resendTemplateId?: string): Promise<{ ok: boolean; message: string }> {
  try {
    const session = await checkPermission("setting:update");
    const to = session?.user?.email;
    if (!to) return { ok: false, message: "No email address on the current admin session." };

    const provider = await getActiveEmailProviderLabel();

    // Template della dashboard Resend: il rendering lo fa Resend, quindi
    // bypassa i nostri template locali e il provider selezionato (vedi
    // sendResendTemplateMail). Le variabili qui sono le stesse del template
    // locale di test — se il template su Resend usa altri nomi, semplicemente
    // non verranno sostituite: è il modo più diretto per verificarle.
    if (resendTemplateId) {
      await sendResendTemplateMail({
        to,
        templateId: resendTemplateId,
        variables: {
          provider,
          recipient: to,
          sentAt: new Date().toLocaleString("en-GB", { timeZone: "UTC", timeZoneName: "short" }),
        },
      });
      return { ok: true, message: `Test email sent to ${to} using Resend template "${resendTemplateId}".` };
    }

    // Template reale (email-templates/test-email.html) invece di HTML inline:
    // così il pulsante di test esercita l'intera catena — provider scelto,
    // render del layout, interpolazione di subject e corpo — e non solo la
    // connessione. Se il template si rompe, si vede qui e non in produzione.
    await sendTemplateMail({
      to,
      template: "test-email",
      args: {
        provider,
        recipient: to,
        sentAt: new Date().toLocaleString("en-GB", { timeZone: "UTC", timeZoneName: "short" }),
      },
    });
    return { ok: true, message: `Test email sent to ${to} via ${provider}.` };
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) return { ok: false, message: error.message };
    console.error("[AdminSettings Action] Error sending test email:", error);
    return { ok: false, message: describeError(error, "Failed to send test email.") };
  }
}

// ---------------------------------------------------------------------------
// Notifications — live Slack test send
// ---------------------------------------------------------------------------
export async function sendTestSlackNotification(): Promise<{ ok: boolean; message: string }> {
  try {
    await checkPermission("setting:update");
    await sendSlackNotification(":test_tube: This is a test notification from *Typamine Admin* — Notifications settings.");
    return { ok: true, message: "Test notification sent to Slack." };
  } catch (error) {
    if (error instanceof SlackNotConfiguredError) return { ok: false, message: error.message };
    console.error("[AdminSettings Action] Error sending test Slack notification:", error);
    return { ok: false, message: describeError(error, "Failed to send Slack notification.") };
  }
}
