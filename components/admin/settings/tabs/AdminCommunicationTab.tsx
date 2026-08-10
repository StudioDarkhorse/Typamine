"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  Plus,
  Trash2,
  Send,
  KeyRound,
  ShieldCheck,
  CircleDashed,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Input, Label } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SettingsSection, SettingsSubCard } from "@/components/admin/settings/SettingsSection";
import { SaveBar } from "@/components/admin/settings/SaveBar";
import { useSettingsForm } from "@/components/admin/settings/useSettingsForm";
import { saveAdminCommunicationSettings, disconnectGmail, sendTestEmail } from "@/lib/actions/adminSettings";
import { AdminSettings, CredentialEntry } from "@/types";

const GMAIL_CALLBACK_STATUS: Record<string, string> = {
  missing_code: "Google did not return an authorization code.",
  missing_client_id: "Set an OAuth Client ID before connecting.",
  missing_client_credentials: "Set both OAuth Client ID and Secret before connecting.",
  no_refresh_token: "Google did not return a refresh token — try disconnecting and reconnecting.",
  exchange_failed: "Token exchange with Google failed.",
  state_mismatch: "Security check failed — please try connecting again.",
  unauthorized: "You don't have permission to connect Gmail.",
};

const PROVIDER_OPTIONS = [
  { label: "Gmail (OAuth 2.0)", value: "gmail_oauth2" },
  { label: "Custom SMTP — coming soon", value: "smtp" },
  { label: "SendGrid — coming soon", value: "sendgrid" },
  { label: "Postmark — coming soon", value: "postmark" },
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.73-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.27a12 12 0 0 0 0 10.78l4-3.11Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
  );
}

let credentialSeq = 0;
function newCredentialRow(): CredentialEntry {
  credentialSeq += 1;
  return { id: `cred-new-${credentialSeq}`, label: "", value: "" };
}

export default function AdminCommunicationTab({ initialSettings }: { initialSettings: AdminSettings }) {
  const [provider, setProvider] = useState(initialSettings.emailProvider);

  const [connected, setConnected] = useState(initialSettings.gmailConnected);
  const [connectedEmail, setConnectedEmail] = useState(initialSettings.gmailConnectedEmail ?? "");
  const [clientId, setClientId] = useState(initialSettings.gmailClientId ?? "");
  const [clientSecret, setClientSecret] = useState(initialSettings.gmailClientSecret ?? "");
  const [showSecret, setShowSecret] = useState(false);
  const [senderName, setSenderName] = useState(initialSettings.gmailSenderName ?? "Typamine");
  const [copied, setCopied] = useState(false);

  const [redirectUri, setRedirectUri] = useState("/api/oauth/gmail/callback");
  useEffect(() => {
    setRedirectUri(`${window.location.origin}/api/oauth/gmail/callback`);
  }, []);

  const searchParams = useSearchParams();
  const [callbackNotice, setCallbackNotice] = useState<{ ok: boolean; message: string } | null>(null);
  useEffect(() => {
    const gmailStatus = searchParams.get("gmail");
    if (!gmailStatus) return;
    if (gmailStatus === "connected") {
      setCallbackNotice({ ok: true, message: "Gmail connected successfully." });
    } else {
      const detail = searchParams.get("detail") || "";
      setCallbackNotice({ ok: false, message: GMAIL_CALLBACK_STATUS[detail] || "Failed to connect Gmail." });
    }
  }, [searchParams]);

  const [disconnecting, startDisconnect] = useTransition();
  const handleDisconnect = () => {
    startDisconnect(async () => {
      await disconnectGmail();
      setConnected(false);
      setConnectedEmail("");
    });
  };

  const [testingEmail, startTestEmail] = useTransition();
  const [testEmailResult, setTestEmailResult] = useState<{ ok: boolean; message: string } | null>(null);
  const handleSendTestEmail = () => {
    setTestEmailResult(null);
    startTestEmail(async () => {
      const result = await sendTestEmail();
      setTestEmailResult(result);
    });
  };

  const [credentials, setCredentials] = useState<CredentialEntry[]>(
    initialSettings.credentialsVault.length > 0 ? initialSettings.credentialsVault : []
  );
  const [maskedIds, setMaskedIds] = useState<Set<string>>(new Set(initialSettings.credentialsVault.map((c) => c.id)));

  const { errorMessage, dispatch, isPending, justSaved } = useSettingsForm(saveAdminCommunicationSettings);

  const copyRedirectUri = async () => {
    try {
      await navigator.clipboard.writeText(redirectUri);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — nothing to fall back to
    }
  };

  const addCredential = () => setCredentials((prev) => [...prev, newCredentialRow()]);
  const removeCredential = (id: string) => setCredentials((prev) => prev.filter((c) => c.id !== id));
  const updateCredential = (id: string, patch: Partial<CredentialEntry>) =>
    setCredentials((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const toggleMasked = (id: string) =>
    setMaskedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const credentialsVaultJson = JSON.stringify(
    credentials.filter((c) => c.label.trim().length > 0)
  );

  return (
    <SettingsSection
      title="Admin Communication"
      subtitle="Connect the mail provider and credentials used for automated outbound email"
    >
      <form action={dispatch} className="space-y-10">
        {callbackNotice && (
          <div
            className={`flex items-start gap-2.5 p-4 rounded-xl text-sm font-haas ${
              callbackNotice.ok ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-500"
            }`}
          >
            {callbackNotice.ok ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            )}
            <p>{callbackNotice.message}</p>
          </div>
        )}

        <SettingsSubCard
          title="Outbound Email Provider"
          description="Choose which service sends transactional and automated email on the platform's behalf."
        >
          <Select label="Provider" options={PROVIDER_OPTIONS} value={provider} onChange={setProvider} />
          <input type="hidden" name="emailProvider" value={provider} />
        </SettingsSubCard>

        {provider === "gmail_oauth2" && (
          <SettingsSubCard
            title="Gmail OAuth 2.0 Connection"
            description="Authorize a Gmail account to send mail via the gmail.send scope — no password is ever stored."
            right={
              connected ? (
                <Badge variant="success" icon={<ShieldCheck className="h-3 w-3" />}>
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" icon={<CircleDashed className="h-3 w-3" />}>
                  Not Connected
                </Badge>
              )
            }
          >
            {connected && (
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-green-500/10 text-sm">
                <span className="font-haas text-black dark:text-white">
                  Sending as <span className="font-bold">{connectedEmail || "account@gmail.com"}</span>
                </span>
                <Button type="button" variant="danger" size="sm" onClick={handleDisconnect} disabled={disconnecting}>
                  {disconnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Disconnect"}
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                name="gmailClientId"
                label="OAuth Client ID"
                placeholder="xxxxxxxxxxxx.apps.googleusercontent.com"
                value={clientId}
                onChange={setClientId}
                autoComplete="off"
              />
              <Input
                name="gmailClientSecret"
                label="OAuth Client Secret"
                type={showSecret ? "text" : "password"}
                placeholder="GOCSPX-••••••••••••••••"
                value={clientSecret}
                onChange={setClientSecret}
                autoComplete="off"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowSecret((v) => !v)}
                    className="pointer-events-auto"
                    title={showSecret ? "Hide secret" : "Show secret"}
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label>Authorized Redirect URI</Label>
                <div className="flex gap-2">
                  <Input value={redirectUri} readOnly onChange={() => {}} className="cursor-text" />
                  <Button type="button" variant="outline" size="md" onClick={copyRedirectUri} title="Copy to clipboard">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Input
                name="gmailSenderName"
                label="Sender Display Name"
                placeholder="Typamine"
                value={senderName}
                onChange={setSenderName}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="/api/oauth/gmail/authorize">
                <Button type="button" variant={connected ? "outline" : "primary"} className="flex items-center gap-2">
                  <GoogleMark />
                  {connected ? "Reconnect with Google" : "Connect with Google"}
                </Button>
              </a>
              <Button
                type="button"
                variant="secondary"
                disabled={!connected || testingEmail}
                onClick={handleSendTestEmail}
                className="flex items-center gap-2"
              >
                {testingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send Test Email
              </Button>
            </div>
            {(clientId !== (initialSettings.gmailClientId ?? "") || clientSecret !== (initialSettings.gmailClientSecret ?? "")) && (
              <p className="text-xs font-haas text-amber-500">
                Save the OAuth Client ID/Secret above before connecting — "Connect with Google" uses the last saved values.
              </p>
            )}
            {testEmailResult && (
              <p className={`text-xs font-haas ${testEmailResult.ok ? "text-green-500" : "text-red-500"}`}>
                {testEmailResult.message}
              </p>
            )}
            <input type="hidden" name="gmailConnected" value={connected ? "true" : "false"} />
            <input type="hidden" name="gmailConnectedEmail" value={connectedEmail} />
          </SettingsSubCard>
        )}

        <SettingsSubCard
          title="API Keys & Credentials Vault"
          description="Store any other API keys or credentials the platform needs — payment, analytics, storage, or future integrations."
          right={
            <Button type="button" variant="outline" size="sm" onClick={addCredential} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Credential
            </Button>
          }
        >
          <div className="space-y-4">
            {credentials.map((cred) => {
              const masked = maskedIds.has(cred.id);
              return (
                <div
                  key={cred.id}
                  className="flex flex-col sm:flex-row sm:items-end gap-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
                >
                  <div className="flex-1">
                    <Input
                      label="Name"
                      placeholder="e.g. Stripe Secret Key"
                      value={cred.label}
                      onChange={(v) => updateCredential(cred.id, { label: v })}
                      leftIcon={<KeyRound className="h-4 w-4" />}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Value"
                      type={masked ? "password" : "text"}
                      placeholder="••••••••••••••••"
                      value={cred.value}
                      onChange={(v) => updateCredential(cred.id, { value: v })}
                      rightIcon={
                        <button
                          type="button"
                          className="pointer-events-auto"
                          onClick={() => toggleMasked(cred.id)}
                          title={masked ? "Show value" : "Hide value"}
                        >
                          {masked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => removeCredential(cred.id)}
                    title="Remove credential"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              );
            })}
            {credentials.length === 0 && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-haas">No credentials stored yet.</p>
            )}
          </div>
          <input type="hidden" name="credentialsVaultJson" value={credentialsVaultJson} />
        </SettingsSubCard>

        <SaveBar errorMessage={errorMessage} isPending={isPending} justSaved={justSaved} label="Save Admin Communication Settings" />
      </form>
    </SettingsSection>
  );
}
