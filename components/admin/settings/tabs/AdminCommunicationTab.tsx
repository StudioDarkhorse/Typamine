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
import { Switch } from "@/components/common/Switch";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SettingsSection, SettingsSubCard } from "@/components/admin/settings/SettingsSection";
import { SaveBar } from "@/components/admin/settings/SaveBar";
import { useSettingsForm } from "@/components/admin/settings/useSettingsForm";
import { saveAdminCommunicationSettings, disconnectGmail, sendTestEmail, getResendTemplates } from "@/lib/actions/adminSettings";
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
  { label: "Resend (HTTP API)", value: "resend" },
  { label: "Gmail (OAuth 2.0)", value: "gmail_oauth2" },
  { label: "Custom SMTP (nodemailer)", value: "smtp" },
  { label: "SendGrid — coming soon", value: "sendgrid" },
  { label: "Postmark — coming soon", value: "postmark" },
];

const SMTP_AUTH_OPTIONS = [
  { label: "App Password", value: "password" },
  { label: "OAuth 2.0 (XOAUTH2)", value: "oauth2" },
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

  // SMTP (nodemailer) — alternativa a Gmail OAuth2, attiva con provider "smtp".
  const [smtpHost, setSmtpHost] = useState(initialSettings.smtpHost ?? "");
  const [smtpPort, setSmtpPort] = useState(String(initialSettings.smtpPort ?? 587));
  const [smtpUser, setSmtpUser] = useState(initialSettings.smtpUser ?? "");
  const [smtpPassword, setSmtpPassword] = useState(initialSettings.smtpPassword ?? "");
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [smtpSecure, setSmtpSecure] = useState(initialSettings.smtpSecure);
  const [smtpFromEmail, setSmtpFromEmail] = useState(initialSettings.smtpFromEmail ?? "");
  const [smtpFromName, setSmtpFromName] = useState(initialSettings.smtpFromName ?? "Typamine");
  const [smtpAuthType, setSmtpAuthType] = useState<string>(initialSettings.smtpAuthType ?? "password");
  const [smtpOauthClientId, setSmtpOauthClientId] = useState(initialSettings.smtpOauthClientId ?? "");
  const [smtpOauthClientSecret, setSmtpOauthClientSecret] = useState(initialSettings.smtpOauthClientSecret ?? "");
  const [smtpOauthRefreshToken, setSmtpOauthRefreshToken] = useState(initialSettings.smtpOauthRefreshToken ?? "");
  const [smtpOauthAccessUrl, setSmtpOauthAccessUrl] = useState(initialSettings.smtpOauthAccessUrl ?? "");
  const [showSmtpOauthSecret, setShowSmtpOauthSecret] = useState(false);

  // Resend — API HTTP, funziona anche su Cloudflare Workers (a differenza di SMTP).
  const [resendApiKey, setResendApiKey] = useState(initialSettings.resendApiKey ?? "");
  const [showResendKey, setShowResendKey] = useState(false);
  const [resendFromEmail, setResendFromEmail] = useState(initialSettings.resendFromEmail ?? "");
  const [resendFromName, setResendFromName] = useState(initialSettings.resendFromName ?? "Typamine");

  // Template creati nella dashboard Resend — caricati on demand, mai al mount:
  // è una chiamata di rete verso un servizio esterno, farla anche a chi non
  // usa Resend (o non ha ancora messo la chiave) sarebbe solo un errore in più.
  const [resendTemplates, setResendTemplates] = useState<{ id: string; name: string; alias: string | null; status: string }[]>([]);
  const [resendTemplateId, setResendTemplateId] = useState("");
  const [loadingTemplates, startLoadTemplates] = useTransition();
  const [templatesError, setTemplatesError] = useState<string | null>(null);
  const handleLoadTemplates = () => {
    setTemplatesError(null);
    startLoadTemplates(async () => {
      const result = await getResendTemplates();
      if (result.ok) setResendTemplates(result.templates);
      else setTemplatesError(result.error ?? "Failed to load templates.");
    });
  };

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
      // Il template Resend vale solo col provider Resend selezionato: passarlo
      // negli altri casi manderebbe una mail via un provider e un template via
      // un altro servizio, senza che l'admin lo abbia chiesto.
      const result = await sendTestEmail(provider === "resend" && resendTemplateId ? resendTemplateId : undefined);
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
            className={`flex items-start gap-2.5 p-4 rounded-xl text-sm font-haas ${callbackNotice.ok ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-500"
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

        {provider === "resend" && (
          <SettingsSubCard
            title="Resend"
            description="HTTP API — no SMTP handshake, so this is the one provider that also works once deployed on Cloudflare Workers. Create an API key at resend.com and verify your sending domain there."
          >
            <Input
              name="resendApiKey"
              label="API Key"
              type={showResendKey ? "text" : "password"}
              placeholder="re_••••••••••••••••"
              value={resendApiKey}
              onChange={setResendApiKey}
              autoComplete="off"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowResendKey((v) => !v)}
                  className="pointer-events-auto"
                  title={showResendKey ? "Hide API key" : "Show API key"}
                >
                  {showResendKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                name="resendFromEmail"
                type="email"
                label="From Email"
                placeholder="noreply@typamine.com"
                value={resendFromEmail}
                onChange={setResendFromEmail}
                autoComplete="off"
              />
              <Input name="resendFromName" label="From Name" placeholder="Typamine" value={resendFromName} onChange={setResendFromName} />
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="text-[11px] font-haas leading-relaxed">
                Until you verify a domain on Resend, the only sender allowed is <code className="text-[10px]">onboarding@resend.dev</code> and
                it can only deliver to the address that owns the Resend account — useful to try the test button, not enough for real traffic.
              </p>
            </div>

            {/* Template della dashboard Resend: il rendering lo fa Resend, non
                i nostri file in /email-templates. Serve solo a provarli da qui;
                l'id scelto non viene salvato. */}
            <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-black dark:text-white">Dashboard Templates</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-haas mt-1 max-w-md leading-relaxed">
                    Templates you created on resend.com. Pick one to use it for the test send below instead of the local
                    <code className="text-[10px] mx-1">email-templates/test-email.html</code>.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleLoadTemplates}
                  disabled={loadingTemplates}
                  className="flex items-center gap-2 shrink-0"
                >
                  {loadingTemplates ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {loadingTemplates ? "Loading..." : resendTemplates.length ? "Reload" : "Load templates"}
                </Button>
              </div>

              {resendTemplates.length > 0 && (
                <Select
                  label="Template"
                  options={[
                    { label: "— None (use local test template) —", value: "" },
                    ...resendTemplates.map((t) => ({
                      // Alias e stato in etichetta: senza, due template con
                      // nome simile sono indistinguibili, e uno in draft non
                      // è inviabile ma comparirebbe identico a uno pubblicato.
                      label: `${t.name}${t.alias ? ` (${t.alias})` : ""}${t.status === "published" ? "" : ` — ${t.status}`}`,
                      value: t.alias || t.id,
                    })),
                  ]}
                  value={resendTemplateId}
                  onChange={setResendTemplateId}
                  placeholder="Choose a template..."
                />
              )}

              {templatesError && <p className="text-[11px] font-haas text-red-500">{templatesError}</p>}
            </div>
          </SettingsSubCard>
        )}

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
                  <Input value={redirectUri} readOnly onChange={() => { }} className="cursor-text" />
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
            </div>
            {(clientId !== (initialSettings.gmailClientId ?? "") || clientSecret !== (initialSettings.gmailClientSecret ?? "")) && (
              <p className="text-xs font-haas text-amber-500">
                Save the OAuth Client ID/Secret above before connecting — "Connect with Google" uses the last saved values.
              </p>
            )}
            <input type="hidden" name="gmailConnected" value={connected ? "true" : "false"} />
            <input type="hidden" name="gmailConnectedEmail" value={connectedEmail} />
          </SettingsSubCard>
        )}

        {provider === "smtp" && (
          <SettingsSubCard
            title="SMTP Server"
            description="Any SMTP server (nodemailer). For Gmail use smtp.gmail.com with an app password — your normal account password will not work, and two-step verification must be enabled first."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <Input name="smtpHost" label="Host" placeholder="smtp.gmail.com" value={smtpHost} onChange={setSmtpHost} autoComplete="off" />
              </div>
              <Input name="smtpPort" type="number" min={1} label="Port" placeholder="587" value={smtpPort} onChange={setSmtpPort} />
            </div>

            <Select
              label="Authentication"
              options={SMTP_AUTH_OPTIONS}
              value={smtpAuthType}
              onChange={setSmtpAuthType}
            />
            <input type="hidden" name="smtpAuthType" value={smtpAuthType} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input name="smtpUser" label="Username" placeholder="you@example.com" value={smtpUser} onChange={setSmtpUser} autoComplete="off" />
              {smtpAuthType === "password" && (
                <Input
                  name="smtpPassword"
                  label="Password / App Password"
                  type={showSmtpPassword ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  value={smtpPassword}
                  onChange={setSmtpPassword}
                  autoComplete="off"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowSmtpPassword((v) => !v)}
                      className="pointer-events-auto"
                      title={showSmtpPassword ? "Hide password" : "Show password"}
                    >
                      {showSmtpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
              )}
            </div>

            {smtpAuthType === "oauth2" && (
              <div className="space-y-6 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <p className="text-[11px] text-ocragray-800 dark:text-zinc-200 font-haas leading-relaxed">
                  XOAUTH2: the access token is derived from the refresh token at send time, so no password is stored. Leave the token
                  endpoint empty for Google; for Microsoft/Outlook use{" "}
                  <code className="text-[10px]">https://login.microsoftonline.com/common/oauth2/v2.0/token</code>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    name="smtpOauthClientId"
                    label="OAuth Client ID"
                    value={smtpOauthClientId}
                    onChange={setSmtpOauthClientId}
                    autoComplete="off"
                  />
                  <Input
                    name="smtpOauthClientSecret"
                    label="OAuth Client Secret"
                    type={showSmtpOauthSecret ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={smtpOauthClientSecret}
                    onChange={setSmtpOauthClientSecret}
                    autoComplete="off"
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowSmtpOauthSecret((v) => !v)}
                        className="pointer-events-auto"
                        title={showSmtpOauthSecret ? "Hide secret" : "Show secret"}
                      >
                        {showSmtpOauthSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />
                </div>

                <Input
                  name="smtpOauthRefreshToken"
                  label="Refresh Token"
                  type="password"
                  placeholder="••••••••••••••••"
                  value={smtpOauthRefreshToken}
                  onChange={setSmtpOauthRefreshToken}
                  autoComplete="off"
                />

                <Input
                  name="smtpOauthAccessUrl"
                  label="Token Endpoint (optional)"
                  placeholder="Leave empty for Google"
                  value={smtpOauthAccessUrl}
                  onChange={setSmtpOauthAccessUrl}
                  autoComplete="off"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input name="smtpFromEmail" type="email" label="From Email" placeholder="Defaults to the username" value={smtpFromEmail} onChange={setSmtpFromEmail} />
              <Input name="smtpFromName" label="From Name" placeholder="Typamine" value={smtpFromName} onChange={setSmtpFromName} />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Switch checked={smtpSecure} onChange={setSmtpSecure} name="smtpSecure" id="smtp-secure" />
              <label htmlFor="smtp-secure" className="cursor-pointer">
                <span className="block text-xs font-bold uppercase tracking-widest text-bluegray-800 dark:text-redgray-200">
                  Implicit TLS (SSL)
                </span>
                <span className="block text-[10px] text-ocragray-800 dark:text-zinc-200 font-haas mt-1 max-w-md">
                  On for port 465. Leave off for port 587, which starts plain and upgrades via STARTTLS — forcing it on there makes the
                  handshake hang instead of failing clearly.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="text-[11px] font-haas leading-relaxed">
                SMTP opens a raw TCP socket, which the Cloudflare Workers runtime used for production deploys does not provide. This
                provider works locally, but in production only Gmail (OAuth 2.0) — which is plain HTTPS — will actually deliver.
              </p>
            </div>
          </SettingsSubCard>
        )}

        {/* Test invio — fuori dai blocchi per-provider: prova sempre quello
            attualmente selezionato, e usa il template reale
            (email-templates/test-email.html), non HTML inline. */}
        <SettingsSubCard
          title="Send a Test Email"
          description="Sends email-templates/test-email.html to the address on your admin account, through the provider selected above."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="secondary" disabled={testingEmail} onClick={handleSendTestEmail} className="flex items-center gap-2">
              {testingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {testingEmail ? "Sending..." : "Send Test Email"}
            </Button>
            {testEmailResult && (
              <p className={`text-xs font-haas ${testEmailResult.ok ? "text-green-500" : "text-red-500"}`}>{testEmailResult.message}</p>
            )}
          </div>
          <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 font-haas">
            Uses the last <em>saved</em> settings — save your changes first, otherwise the test runs against the previous configuration.
          </p>
        </SettingsSubCard>

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
              <p className="text-xs text-ocragray-800 dark:text-zinc-200 font-haas">No credentials stored yet.</p>
            )}
          </div>
          <input type="hidden" name="credentialsVaultJson" value={credentialsVaultJson} />
        </SettingsSubCard>

        <SaveBar errorMessage={errorMessage} isPending={isPending} justSaved={justSaved} label="Save Admin Communication Settings" />
      </form>
    </SettingsSection>
  );
}
