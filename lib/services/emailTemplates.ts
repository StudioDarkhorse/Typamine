import fs from "fs";
import path from "path";

// Renderer minimale per i template HTML in /email-templates.
//
// Perché non una libreria (handlebars/mjml/react-email): serve solo
// interpolazione di argomenti e qualche blocco condizionale, e i template
// devono restare HTML puro leggibile/modificabile senza build step — una
// dipendenza in più qui pagherebbe solo per feature che non usiamo.
//
// Sintassi supportata:
//   {{arg}}            -> valore dell'argomento, HTML-escaped
//   {{{arg}}}          -> valore grezzo, NON escaped (usare solo per HTML
//                         costruito da noi, mai per input utente)
//   {{#arg}}...{{/arg}} -> blocco incluso solo se `arg` è valorizzato
//                         (non vuoto/undefined/false)
//
// Il SUBJECT vive nel template stesso, nella prima riga del commento HTML in
// testa al file (`subject: ...`), e supporta la stessa interpolazione del
// corpo — così testo e oggetto di una mail restano un artefatto unico invece
// di essere sparsi tra file HTML e codice chiamante.

export type EmailTemplateArgs = Record<string, string | number | boolean | null | undefined>;

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// I template sono letti da disco a runtime (non importati come moduli), così
// modificarli non richiede ricompilare nulla. process.cwd() è la root del
// progetto sia in dev che nel build standalone di Next.
const TEMPLATES_DIR = path.join(process.cwd(), "email-templates");

// Cache in memoria: i file non cambiano durante la vita del processo in
// produzione, e rileggerli ad ogni invio sarebbe I/O sprecato. In dev la
// cache è disattivata, altrimenti modificare un template richiederebbe un
// restart per vederne l'effetto.
const templateCache = new Map<string, string>();

function readTemplate(fileName: string): string {
  const isDev = process.env.NODE_ENV !== "production";
  const cached = templateCache.get(fileName);
  if (cached && !isDev) return cached;

  const filePath = path.join(TEMPLATES_DIR, fileName);
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    throw new Error(`Email template not found: ${fileName} (looked in ${TEMPLATES_DIR})`);
  }
  templateCache.set(fileName, raw);
  return raw;
}

/**
 * Nomi dei template disponibili in /email-templates (senza estensione).
 * `layout` è escluso: è la shell che avvolge gli altri, non un template
 * spedibile per conto proprio.
 */
export function listLocalTemplates(): string[] {
  try {
    return fs
      .readdirSync(TEMPLATES_DIR)
      .filter((f) => f.endsWith(".html"))
      .map((f) => f.replace(/\.html$/, ""))
      .filter((name) => name !== "layout")
      .sort();
  } catch {
    return [];
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function argToString(value: EmailTemplateArgs[string]): string {
  if (value === null || value === undefined || value === false) return "";
  return String(value);
}

function isTruthyArg(value: EmailTemplateArgs[string]): boolean {
  if (value === null || value === undefined || value === false) return false;
  return String(value).trim().length > 0;
}

/**
 * Applica blocchi condizionali e interpolazione a una stringa.
 *
 * @param escapeValues true (default) per il corpo HTML; false per contesti di
 *        testo puro come il SUBJECT — lì l'escaping sarebbe controproducente,
 *        un oggetto "New Font <Submitted>" arriverebbe letteralmente come
 *        "New Font &lt;Submitted&gt;" nella inbox.
 */
export function interpolate(template: string, args: EmailTemplateArgs, escapeValues = true): string {
  // 1. Blocchi condizionali per primi: se il blocco viene rimosso, i
  //    segnaposto al suo interno non vanno nemmeno interpolati.
  let out = template.replace(
    /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g,
    (_match, key: string, body: string) => (isTruthyArg(args[key]) ? body : "")
  );

  // 2. Raw ({{{x}}}) prima di escaped ({{x}}), altrimenti la regex a due
  //    graffe mangerebbe le triple lasciando graffe spaiate.
  out = out.replace(/\{\{\{(\w+)\}\}\}/g, (_match, key: string) => argToString(args[key]));
  out = out.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
    const value = argToString(args[key]);
    return escapeValues ? escapeHtml(value) : value;
  });

  return out;
}

/** Estrae il subject dichiarato nel commento in testa al template. */
function extractSubject(templateRaw: string): string | null {
  const match = templateRaw.match(/^\s*<!--[\s\S]*?subject:\s*(.+?)\s*(?:\r?\n|-->)/);
  return match ? match[1].trim() : null;
}

/** Rimuove i commenti HTML: quello in testa è metadata nostra, non contenuto. */
function stripComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "").trim();
}

// Fallback testuale per i client che non renderizzano HTML (e per il campo
// `text` di nodemailer, che migliora anche il punteggio antispam): non un
// parser HTML completo, solo quanto basta a rendere leggibile il nostro
// markup — i <br>/</p>/</tr> diventano a capo, i tag spariscono, le entità
// principali tornano ai caratteri originali.
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h1|h2|h3|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

/**
 * Renderizza un template di /email-templates dentro layout.html.
 *
 * @param templateName nome del file senza estensione (es. "test-email")
 * @param args argomenti interpolati sia nel subject che nel corpo
 * @param subjectOverride subject esplicito, se il chiamante vuole ignorare
 *        quello dichiarato nel template
 */
export function renderEmailTemplate(
  templateName: string,
  args: EmailTemplateArgs = {},
  subjectOverride?: string
): RenderedEmail {
  const templateRaw = readTemplate(`${templateName}.html`);

  const declaredSubject = extractSubject(templateRaw);
  // Subject = testo puro (header email): interpolato SENZA escaping HTML.
  const subject = interpolate(subjectOverride ?? declaredSubject ?? "Typamine", args, false);

  const content = interpolate(stripComments(templateRaw), args);

  // Il contenuto è già HTML nostro e già interpolato: nel layout usa il
  // segnaposto RAW ({{{content}}}), altrimenti finirebbe escaped e si
  // vedrebbero i tag come testo.
  const html = interpolate(readTemplate("layout.html"), {
    ...args,
    content,
    subject,
    year: new Date().getFullYear(),
  });

  return { subject, html, text: htmlToPlainText(content) };
}
