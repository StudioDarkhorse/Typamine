"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Type, UserPlus, MessageSquare, CalendarClock, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { SettingsSection, SettingsSubCard } from "@/components/admin/settings/SettingsSection";
import { SaveBar } from "@/components/admin/settings/SaveBar";
import { useSettingsForm } from "@/components/admin/settings/useSettingsForm";
import { saveNotificationsSettings, sendTestSlackNotification } from "@/lib/actions/adminSettings";
import { AdminSettings, NotificationChannel, NotificationChannels } from "@/types";

const CHANNEL_OPTIONS = [
  { label: "Off", value: "off" },
  { label: "Email", value: "email" },
  { label: "Slack", value: "slack" },
  { label: "Email + Slack", value: "both" },
];

interface NotificationEvent {
  key: keyof NotificationChannels;
  icon: ReactNode;
  title: string;
  description: string;
}

const EVENTS: NotificationEvent[] = [
  {
    key: "font_submission",
    icon: <Type className="h-4 w-4" />,
    title: "New Font Submission",
    description: "A designer submits a new font or family for review.",
  },
  {
    key: "user_registration",
    icon: <UserPlus className="h-4 w-4" />,
    title: "New User Registration",
    description: "A new account is created on the platform.",
  },
  {
    key: "contact_message",
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Contact Form Message",
    description: "A visitor submits the public contact form.",
  },
  {
    key: "weekly_digest",
    icon: <CalendarClock className="h-4 w-4" />,
    title: "Weekly Digest Report",
    description: "A summary of activity sent once a week.",
  },
];

export default function NotificationsTab({ initialSettings }: { initialSettings: AdminSettings }) {
  const [channels, setChannels] = useState<NotificationChannels>(initialSettings.notificationChannels);
  const [slackWebhook, setSlackWebhook] = useState(initialSettings.slackWebhookUrl ?? "");

  const { errorMessage, dispatch, isPending, justSaved } = useSettingsForm(saveNotificationsSettings);

  const [testing, startTest] = useTransition();
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const handleSendTest = () => {
    setTestResult(null);
    startTest(async () => {
      const result = await sendTestSlackNotification();
      setTestResult(result);
    });
  };

  const usesSlack = Object.values(channels).some((v) => v === "slack" || v === "both");
  const notificationChannelsJson = JSON.stringify(channels);

  return (
    <SettingsSection title="Notifications" subtitle="Where admins are alerted about platform activity">
      <form action={dispatch} className="space-y-10">
        <SettingsSubCard title="Event Notifications" description="Choose a delivery channel per event, independent of the mail provider used to send it.">
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {EVENTS.map((event) => (
              <div key={event.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-black/60 dark:text-white/60 shrink-0">
                    {event.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">{event.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-haas">{event.description}</p>
                  </div>
                </div>
                <div className="w-full sm:w-48 shrink-0">
                  <Select
                    options={CHANNEL_OPTIONS}
                    value={channels[event.key] || "off"}
                    onChange={(v) => setChannels((prev) => ({ ...prev, [event.key]: v as NotificationChannel }))}
                  />
                </div>
              </div>
            ))}
          </div>
        </SettingsSubCard>

        {usesSlack && (
          <SettingsSubCard title="Slack Webhook" description="Incoming webhook URL used for events routed to Slack.">
            <Input
              name="slackWebhookUrl"
              label="Webhook URL"
              placeholder="https://hooks.slack.com/services/…"
              value={slackWebhook}
              onChange={setSlackWebhook}
            />
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={testing || !slackWebhook.trim()}
                onClick={handleSendTest}
                className="flex items-center gap-2"
              >
                {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send Test Notification
              </Button>
              {testResult && (
                <p className={`text-xs font-haas ${testResult.ok ? "text-green-500" : "text-red-500"}`}>{testResult.message}</p>
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-haas">
              Test sends against the last <em>saved</em> webhook URL — save first if you just changed it.
            </p>
          </SettingsSubCard>
        )}

        <input type="hidden" name="notificationChannelsJson" value={notificationChannelsJson} />
        <SaveBar errorMessage={errorMessage} isPending={isPending} justSaved={justSaved} label="Save Notifications" />
      </form>
    </SettingsSection>
  );
}
