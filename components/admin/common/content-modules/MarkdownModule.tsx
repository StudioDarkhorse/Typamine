"use client";

import { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  List,
  ListOrdered,
  Quote as QuoteIcon,
  Link as LinkIcon,
  Code,
  Minus,
  CornerDownLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { Label } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import Markdown from "@/components/common/Markdown";
import {
  GranularColorPickerButton,
  FONT_FAMILIES,
  Module,
} from "./shared";

interface MarkdownModuleProps {
  module: Module;
  onChange: (newProps: Record<string, any>) => void;
}

// Editor del content-module "markdown": un solo blocco di testo che copre i
// casi che paragraph/paragraphWithImage non reggono — liste, parti in
// grassetto/corsivo dentro la stessa frase, a capo controllati, citazioni,
// heading intermedi. Il markdown viene convertito in HTML con classi Tailwind
// statiche in lib/markdown.ts, quindi qui l'anteprima usa lo stesso identico
// componente di render pubblico (components/common/Markdown).

const TEXTAREA_CLASSNAME =
  "w-full bg-bluegray-100 dark:bg-bluegray-900/50 border border-bluegray-200 dark:border-redgray-800 hover:border-bluegray-400 dark:hover:border-redgray-600 focus:border-blue dark:focus:border-red rounded-md px-3 py-2 text-foreground outline-none transition-colors font-mono text-sm leading-relaxed resize-y";

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="h-8 w-8 flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
    >
      {children}
    </button>
  );
}

export default function MarkdownModule({ module, onChange }: MarkdownModuleProps) {
  const { props } = module;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(true);

  const content: string = props.content ?? "";

  const handleChange = (key: string, value: any) => {
    onChange({ ...props, [key]: value });
  };

  // Riposiziona il cursore dopo che React ha riscritto il valore del textarea:
  // senza questo, ogni click sulla toolbar manderebbe il caret in fondo.
  const restoreSelection = (start: number, end: number) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(start, end);
    });
  };

  const wrapSelection = (before: string, after: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end } = textarea;
    const selected = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    handleChange("content", next);
    restoreSelection(start + before.length, start + before.length + selected.length);
  };

  // Prefisso di riga (liste, quote, heading): applicato a tutte le righe della
  // selezione, non solo alla prima.
  const prefixLines = (prefix: (index: number) => string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end } = textarea;
    const lineStart = content.lastIndexOf("\n", start - 1) + 1;
    const selected = content.slice(lineStart, end) || placeholder;
    const prefixed = selected
      .split("\n")
      .map((line, index) => `${prefix(index)}${line}`)
      .join("\n");
    const next = content.slice(0, lineStart) + prefixed + content.slice(end);
    handleChange("content", next);
    restoreSelection(lineStart, lineStart + prefixed.length);
  };

  const insertAtCursor = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end } = textarea;
    const next = content.slice(0, start) + snippet + content.slice(end);
    handleChange("content", next);
    restoreSelection(start + snippet.length, start + snippet.length);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Toolbar + editor */}
      <div className="space-y-2 mb-16">
        <div className="flex items-center justify-between gap-2">
          <Label className="mb-0">Markdown Content</Label>
          <button
            type="button"
            onClick={() => setShowPreview((prev) => !prev)}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <ToolbarButton label="Bold" onClick={() => wrapSelection("**", "**", "grassetto")}>
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Italic" onClick={() => wrapSelection("*", "*", "corsivo")}>
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Strikethrough" onClick={() => wrapSelection("~~", "~~", "barrato")}>
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Inline code" onClick={() => wrapSelection("`", "`", "codice")}>
            <Code className="h-4 w-4" />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-black/10 dark:bg-white/10" />

          <ToolbarButton label="Heading" onClick={() => prefixLines(() => "## ", "Titolo")}>
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Bullet list" onClick={() => prefixLines(() => "- ", "Voce")}>
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Numbered list"
            onClick={() => prefixLines((index) => `${index + 1}. `, "Voce")}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Quote" onClick={() => prefixLines(() => "> ", "Citazione")}>
            <QuoteIcon className="h-4 w-4" />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-black/10 dark:bg-white/10" />

          <ToolbarButton label="Link" onClick={() => wrapSelection("[", "](https://)", "testo link")}>
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Line break" onClick={() => insertAtCursor("\n")}>
            <CornerDownLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Divider" onClick={() => insertAtCursor("\n\n---\n\n")}>
            <Minus className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <textarea
          ref={textareaRef}
          rows={14}
          value={content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder={"## Titolo\n\nParagrafo con **grassetto**, *corsivo* e [link](https://esempio.it).\nUn a capo singolo diventa un <br />.\n\n- primo punto\n- secondo punto\n  - sotto-punto"}
          className={TEXTAREA_CLASSNAME}
        />

        <p className="text-[10px] text-black/50 dark:text-white/50">
          **bold** · *italic* · ~~strikethrough~~ · `code` · # heading · - list · 1. numbered
          list · &gt; quote · --- line · [text](url) · single line break = &lt;br /&gt;
        </p>
      </div>

      {/* Anteprima con lo stesso renderer del sito pubblico */}
      {showPreview && (
        <div className="space-y-2 mb-16">
          <Label>Preview</Label>
          <div className="rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 p-4">
            {content.trim() ? (
              <Markdown
                content={content}
                size={props.size}
                align={props.align}
                colorClassName={props.colorClassName}
              />
            ) : (
              <span className="text-xs italic text-black/40 dark:text-white/40">
                Nothing to preview yet.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tipografia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div className="space-y-2">
          <Label>Base Size</Label>
          <Select
            options={["sm", "md", "lg", "xl", "2xl"].map((s) => ({ label: s, value: s }))}
            value={props.size}
            onChange={(v: string) => handleChange("size", v)}
          />
        </div>
        <div className="space-y-2">
          <Label>Align</Label>
          <Select
            options={[
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
              { label: "Justify", value: "justify" },
            ]}
            value={props.align}
            onChange={(v: string) => handleChange("align", v)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <GranularColorPickerButton
          label="Text Color"
          value={props.colorClassName}
          onChange={(v: string) => handleChange("colorClassName", v)}
        />
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            options={FONT_FAMILIES.map((font) => ({ label: font.label, value: font.id }))}
            value={props.fontFamily}
            onChange={(v: string) => handleChange("fontFamily", v)}
          />
        </div>
      </div>
    </div>
  );
}
