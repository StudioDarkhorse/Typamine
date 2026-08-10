// Verifica server-side di un token reCAPTCHA v3 (siteverify) — usata da
// qualunque futuro form pubblico protetto (contact, commenti, ecc). Legge
// active/secretKey da AdminSettings.integrationsConfig invece che da env,
// coerente col resto di Integrations. Nessun form pubblico esiste ancora nel
// codebase da chiamarla, ma è il pezzo mancante perché reCAPTCHA sia
// "funzionale al 100%" appena uno esiste.
import prisma from "@/lib/prisma";
import { withSafeDbQuery } from "./dbMigration";
import { ADMIN_SETTINGS_ID } from "./adminSettings";
import { IntegrationsConfig } from "@/types";

export async function verifyRecaptchaToken(token: string, minScore = 0.5): Promise<boolean> {
  const record = await withSafeDbQuery(() =>
    prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID }, select: { integrationsConfig: true } })
  );

  let cfg: IntegrationsConfig = {};
  try {
    cfg = record?.integrationsConfig ? JSON.parse(record.integrationsConfig) : {};
  } catch {
    cfg = {};
  }

  const secretKey = cfg.recaptcha?.secretKey as string | undefined;
  if (!cfg.recaptcha?.active || !secretKey) return true; // disattivato: nessun blocco

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const data: any = await res.json();
    return !!data.success && (typeof data.score !== "number" || data.score >= minScore);
  } catch {
    return false;
  }
}
