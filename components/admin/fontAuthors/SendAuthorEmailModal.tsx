"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Mail, Loader2, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { getAuthorEmailBindings, getLocalEmailTemplates, sendFontAuthorEmail } from "@/lib/actions/fontAuthor";
import { getResendTemplates } from "@/lib/actions/adminSettings";

interface SendAuthorEmailModalProps {
  author: { id: string; name: string; email?: string | null };
  isOpen: boolean;
  onClose: () => void;
}

// I due sistemi di template convivono, e la differenza conta perché cambia
// CHI renderizza la mail: "local" sono file HTML in /email-templates
// renderizzati da noi e spediti col provider configurato in Admin
// Communication; "resend" sono quelli creati nella dashboard Resend, dove il
// rendering (e quindi la sostituzione delle variabili) lo fa Resend.
// Il valore del select porta con sé la sorgente per non doverla indovinare.
type TemplateOption = { label: string; value: string };

export default function SendAuthorEmailModal({ author, isOpen, onClose }: SendAuthorEmailModalProps) {
  const [options, setOptions] = useState<TemplateOption[]>([]);
  const [selected, setSelected] = useState("");
  const [bindings, setBindings] = useState<Record<string, string> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, startLoading] = useTransition();
  const [sending, startSending] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Caricato all'apertura, non al mount della riga: la tabella può avere
  // decine di autori, e ognuno monterebbe la propria fetch di template.
  useEffect(() => {
    if (!isOpen) return;
    setResult(null);
    setLoadError(null);
    startLoading(async () => {
      const [locals, resend, resolved] = await Promise.all([
        getLocalEmailTemplates(),
        // I template Resend sono un extra: se la chiave non è configurata
        // l'elenco locale deve restare comunque utilizzabile, quindi qui un
        // errore non blocca il modale, lo si segnala e basta.
        getResendTemplates(),
        getAuthorEmailBindings(author.id).catch((err) => {
          setLoadError(err instanceof Error ? err.message : String(err));
          return null;
        }),
      ]);

      const opts: TemplateOption[] = locals.map((name) => ({
        label: `${name} (local)`,
        value: `local:${name}`,
      }));

      if (resend.ok) {
        opts.push(
          ...resend.templates.map((t) => ({
            label: `${t.name}${t.alias ? ` (${t.alias})` : ""} — Resend${t.status === "published" ? "" : ` [${t.status}]`}`,
            value: `resend:${t.alias || t.id}`,
          }))
        );
      }

      setOptions(opts);
      setBindings(resolved);

      // Preseleziona la mail di primo contatto se c'è: è l'uso previsto di
      // questa azione, e risparmia un passaggio nel caso più frequente.
      const firstContact = opts.find((o) => o.value.endsWith("author-first-email"));
      setSelected(firstContact?.value ?? opts[0]?.value ?? "");
    });
  }, [isOpen, author.id]);

  const handleSend = () => {
    if (!selected) return;
    setResult(null);
    const [source, ...rest] = selected.split(":");
    const templateId = rest.join(":");
    startSending(async () => {
      const res = await sendFontAuthorEmail({
        authorId: author.id,
        templateId,
        source: source === "resend" ? "resend" : "local",
      });
      setResult(res);
    });
  };

  const busy = loading || sending;

  return (
    <BaseModal isOpen={isOpen} onClose={() => !busy && onClose()} size="lg">
      <BaseModal.Header onClose={() => !busy && onClose()}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl font-rezland text-black dark:text-white leading-tight">Send Email</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              {author.name}
              {author.email ? ` · ${author.email}` : " · no email on file"}
            </p>
          </div>
        </div>
      </BaseModal.Header>

      <BaseModal.Body>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Loading templates...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {!author.email && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 text-red-500">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="text-xs font-haas leading-relaxed">This author has no email address on file — nothing can be sent.</p>
              </div>
            )}

            <Select label="Template" options={options} value={selected} onChange={setSelected} placeholder="Choose a template..." />

            {/* Anteprima dei valori sostituiti: è l'unico modo per accorgersi
                PRIMA dell'invio che un binding è vuoto o sbagliato (es. un
                autore con 0 font non liberi, o il link di verifica ancora
                placeholder). */}
            {bindings && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                  Variables that will be substituted
                </p>
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
                  {Object.entries(bindings).map(([key, value]) => (
                    <div key={key} className="flex items-start justify-between gap-4 px-4 py-2.5 text-xs">
                      <code className="text-[11px] text-zinc-500 dark:text-zinc-400 shrink-0">{`{{${key}}}`}</code>
                      <span className="font-bold text-black dark:text-white text-right break-all">{value || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loadError && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="text-xs font-haas leading-relaxed">Could not resolve variables: {loadError}</p>
              </div>
            )}

            {result && (
              <div
                className={`flex items-start gap-2.5 p-3 rounded-xl text-xs font-haas ${
                  result.ok ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-500"
                }`}
              >
                {result.ok ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <p className="leading-relaxed">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </BaseModal.Body>

      <BaseModal.Footer>
        <div className="flex items-center gap-3 justify-end">
          <Button variant="outline" size="md" roundness="lg" onClick={onClose} disabled={busy}>
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            roundness="lg"
            onClick={handleSend}
            disabled={busy || !selected || !author.email}
            className="flex items-center gap-2"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {sending ? "Sending..." : "Send Email"}
          </Button>
        </div>
      </BaseModal.Footer>
    </BaseModal>
  );
}
