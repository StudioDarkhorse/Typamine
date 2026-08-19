// Parser Markdown minimale (zero dipendenze) usato dal content-module
// "markdown": trasforma il sorgente scritto in admin in HTML *già vestito*
// con classi Tailwind statiche. Le classi sono scritte qui come stringhe
// letterali proprio perché Tailwind le veda in fase di build (a differenza
// delle stringhe dinamiche colore/opacità dei color picker, risolte via CSS
// var — vedi lib/dynamicStyle.ts).
//
// Supporta: heading h1-h6, grassetto, corsivo, grassetto+corsivo, barrato,
// codice inline e a blocco, link (esterni con target _blank), immagini,
// liste puntate/numerate anche annidate, blockquote, hr, e i "br" (ogni
// singolo a capo dentro un paragrafo diventa <br />).
// NON supporta (ancora): tabelle, footnote, HTML inline — l'HTML in input
// viene sempre escapato, mai eseguito.

export type MarkdownElement =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "p" | "ul" | "ol" | "li"
  | "strong" | "em" | "del" | "a"
  | "code" | "pre" | "preCode"
  | "blockquote" | "hr" | "img" | "br";

export type MarkdownClasses = Record<MarkdownElement, string>;

// Nessun colore assoluto qui: il colore lo eredita dal wrapper (.dyn-text)
// che il modulo applica dal color picker admin. Solo ritmo, peso e forma.
export const MARKDOWN_CLASSES: MarkdownClasses = {
  h1: "text-4xl md:text-5xl font-bold tracking-tight mt-8 mb-4 first:mt-0",
  h2: "text-3xl md:text-4xl font-bold tracking-tight mt-8 mb-4 first:mt-0",
  h3: "text-2xl md:text-3xl font-bold mt-6 mb-3 first:mt-0",
  h4: "text-xl md:text-2xl font-semibold mt-6 mb-2 first:mt-0",
  h5: "text-lg font-semibold mt-4 mb-2 first:mt-0",
  h6: "text-base font-semibold uppercase tracking-wider opacity-80 mt-4 mb-2 first:mt-0",
  p: "leading-relaxed mb-4 last:mb-0",
  ul: "list-disc pl-6 mb-4 space-y-1 marker:opacity-60",
  ol: "list-decimal pl-6 mb-4 space-y-1 marker:opacity-60",
  li: "leading-relaxed",
  strong: "font-bold",
  em: "italic",
  del: "line-through opacity-70",
  a: "underline underline-offset-4 hover:opacity-70 transition-opacity",
  code: "px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[0.9em]",
  pre: "p-4 mb-4 rounded-lg bg-black/10 dark:bg-white/10 overflow-x-auto",
  preCode: "font-mono text-sm leading-relaxed whitespace-pre",
  blockquote: "border-l-4 border-current/30 pl-4 my-4 italic opacity-90",
  hr: "my-8 border-0 border-t border-current/20",
  img: "max-w-full h-auto rounded-lg my-4",
  br: "",
};

export interface MarkdownRenderOptions {
  classes?: Partial<MarkdownClasses>;
}

const LIST_RE = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
// Sentinella non digitabile: i code span vengono estratti prima delle altre
// regole inline e reinseriti alla fine, senza rischio di collisione col testo.
const CODE_PLACEHOLDER = "\u0000";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const attr = (className: string): string => (className ? ` class="${className}"` : "");

// Schemi ammessi per href/src: tutto il resto (javascript:, data:, vbscript:)
// viene neutralizzato — il contenuto è scritto in admin ma non c'è motivo di
// lasciare la porta aperta.
const safeUrl = (raw: string): string => {
  const url = raw.trim();
  if (/^(https?:|mailto:|tel:|media:|\/|#|\.)/i.test(url)) return url;
  return "#";
};

function renderInline(raw: string, c: MarkdownClasses): string {
  const codeSpans: string[] = [];
  let text = escapeHtml(raw);

  // Il codice inline va estratto per primo: dentro i backtick nessun'altra
  // regola inline deve applicarsi (**non grassetto** resta letterale).
  text = text.replace(/`([^`]+)`/g, (_match, code: string) => {
    codeSpans.push(code);
    return `${CODE_PLACEHOLDER}${codeSpans.length - 1}${CODE_PLACEHOLDER}`;
  });

  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_match, alt: string, src: string) =>
      `<img src="${safeUrl(src)}" alt="${alt}" loading="lazy"${attr(c.img)} />`
  );

  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_match, label: string, href: string) => {
      const url = safeUrl(href);
      const external = /^https?:/i.test(url)
        ? ` target="_blank" rel="noopener noreferrer"`
        : "";
      return `<a href="${url}"${external}${attr(c.a)}>${label}</a>`;
    }
  );

  text = text
    .replace(
      /\*\*\*(\S(?:[\s\S]*?\S)?)\*\*\*/g,
      `<strong${attr(c.strong)}><em${attr(c.em)}>$1</em></strong>`
    )
    .replace(/\*\*(\S(?:[\s\S]*?\S)?)\*\*/g, `<strong${attr(c.strong)}>$1</strong>`)
    .replace(/__(\S(?:[\s\S]*?\S)?)__/g, `<strong${attr(c.strong)}>$1</strong>`)
    .replace(/\*(\S(?:[^*\n]*?\S)?)\*/g, `<em${attr(c.em)}>$1</em>`)
    // underscore singolo solo a bordo parola: snake_case_così non diventa corsivo
    .replace(/(^|[\s(])_(\S(?:[^_\n]*?\S)?)_(?=$|[\s).,;:!?])/g, `$1<em${attr(c.em)}>$2</em>`)
    .replace(/~~(\S(?:[\s\S]*?\S)?)~~/g, `<del${attr(c.del)}>$1</del>`);

  text = text.replace(
    new RegExp(`${CODE_PLACEHOLDER}(\\d+)${CODE_PLACEHOLDER}`, "g"),
    (_match, index: string) => `<code${attr(c.code)}>${codeSpans[Number(index)]}</code>`
  );

  return text;
}

function parseList(lines: string[], start: number, c: MarkdownClasses): [string, number] {
  const first = lines[start].match(LIST_RE)!;
  const indent = first[1].length;
  const ordered = /^\d/.test(first[2]);
  const items: string[] = [];
  let i = start;

  while (i < lines.length) {
    const match = lines[i].match(LIST_RE);
    if (!match) break;

    const currentIndent = match[1].length;
    if (currentIndent < indent) break;

    if (currentIndent > indent) {
      const [nested, next] = parseList(lines, i, c);
      if (items.length) items[items.length - 1] += nested;
      else items.push(nested);
      i = next;
      continue;
    }

    if (/^\d/.test(match[2]) !== ordered) break;

    items.push(renderInline(match[3], c));
    i++;

    // Righe di continuazione (non vuote, non nuovo item): restano nello stesso
    // <li>, separate da un <br /> — così un item può essere multi-riga.
    while (i < lines.length && lines[i].trim() && !LIST_RE.test(lines[i])) {
      items[items.length - 1] += `<br${attr(c.br)} />${renderInline(lines[i].trim(), c)}`;
      i++;
    }
  }

  const tag = ordered ? "ol" : "ul";
  const listClass = ordered ? c.ol : c.ul;
  const html =
    `<${tag}${attr(listClass)}>` +
    items.map((item) => `<li${attr(c.li)}>${item}</li>`).join("") +
    `</${tag}>`;

  return [html, i];
}

const startsNewBlock = (line: string): boolean =>
  !line.trim() ||
  /^\s*```/.test(line) ||
  /^(#{1,6})\s+/.test(line) ||
  /^\s*>/.test(line) ||
  LIST_RE.test(line) ||
  /^\s*([-*_])\s*(\1\s*){2,}$/.test(line);

export function renderMarkdown(source: string, options: MarkdownRenderOptions = {}): string {
  const c: MarkdownClasses = { ...MARKDOWN_CLASSES, ...(options.classes ?? {}) };
  const lines = (source ?? "").replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Blocco di codice recintato
    if (/^\s*```/.test(line)) {
      const buffer: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        buffer.push(lines[i]);
        i++;
      }
      i++; // salta la riga di chiusura
      out.push(
        `<pre${attr(c.pre)}><code${attr(c.preCode)}>${escapeHtml(buffer.join("\n"))}</code></pre>`
      );
      continue;
    }

    // Linea orizzontale
    if (/^\s*([-*_])\s*(\1\s*){2,}$/.test(line)) {
      out.push(`<hr${attr(c.hr)} />`);
      i++;
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const tag = `h${heading[1].length}` as MarkdownElement;
      out.push(`<${tag}${attr(c[tag])}>${renderInline(heading[2].trim(), c)}</${tag}>`);
      i++;
      continue;
    }

    // Blockquote — il contenuto interno è a sua volta markdown
    if (/^\s*>/.test(line)) {
      const buffer: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        buffer.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      out.push(
        `<blockquote${attr(c.blockquote)}>${renderMarkdown(buffer.join("\n"), options)}</blockquote>`
      );
      continue;
    }

    // Liste (annidate incluse)
    if (LIST_RE.test(line)) {
      const [html, next] = parseList(lines, i, c);
      out.push(html);
      i = next;
      continue;
    }

    // Paragrafo: ogni singolo a capo interno diventa <br />
    const paragraph: string[] = [];
    while (i < lines.length && !startsNewBlock(lines[i])) {
      paragraph.push(lines[i].trim());
      i++;
    }
    out.push(
      `<p${attr(c.p)}>${paragraph.map((l) => renderInline(l, c)).join(`<br${attr(c.br)} />`)}</p>`
    );
  }

  return out.join("\n");
}
