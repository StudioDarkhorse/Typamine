"use client";

import { useState } from "react";
import { BarChart3, Target, ShieldQuestion, MapPin, Tag } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Switch } from "@/components/common/Switch";
import { SettingsSection, SettingsSubCard } from "@/components/admin/settings/SettingsSection";
import { SaveBar } from "@/components/admin/settings/SaveBar";
import { useSettingsForm } from "@/components/admin/settings/useSettingsForm";
import { saveIntegrationsSettings } from "@/lib/actions/adminSettings";
import { AdminSettings, IntegrationConfig } from "@/types";

function useIntegration(initial: Omit<IntegrationConfig, "active">) {
  return useState<IntegrationConfig>({ active: false, ...initial });
}

export default function IntegrationsTab({ initialSettings }: { initialSettings: AdminSettings }) {
  const cfg = initialSettings.integrationsConfig;
  const [analytics, setAnalytics] = useIntegration({ measurementId: cfg.analytics?.measurementId ?? "", ...cfg.analytics });
  const [tagManager, setTagManager] = useIntegration({ containerId: cfg.tagManager?.containerId ?? "", ...cfg.tagManager });
  const [pixel, setPixel] = useIntegration({ pixelId: cfg.pixel?.pixelId ?? "", ...cfg.pixel });
  const [recaptcha, setRecaptcha] = useIntegration({ siteKey: cfg.recaptcha?.siteKey ?? "", secretKey: cfg.recaptcha?.secretKey ?? "", ...cfg.recaptcha });
  const [maps, setMaps] = useIntegration({ apiKey: cfg.maps?.apiKey ?? "", ...cfg.maps });

  const { errorMessage, dispatch, isPending, justSaved } = useSettingsForm(saveIntegrationsSettings);

  const patch = (setter: (v: IntegrationConfig) => void, current: IntegrationConfig, key: string, value: string | boolean) =>
    setter({ ...current, [key]: value });

  const integrationsConfigJson = JSON.stringify({ analytics, tagManager, pixel, recaptcha, maps });

  return (
    <SettingsSection title="Integrations" subtitle="Third-party services connected to the public website">
      <form action={dispatch} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SettingsSubCard
            title="Google Analytics"
            description="Track visitor behavior across the public site."
            right={<Switch checked={analytics.active} onChange={(v) => patch(setAnalytics, analytics, "active", v)} />}
          >
            {analytics.active && (
              <Input
                label="Measurement ID"
                placeholder="G-XXXXXXXXXX"
                leftIcon={<BarChart3 className="h-4 w-4" />}
                value={analytics.measurementId as string}
                onChange={(v) => patch(setAnalytics, analytics, "measurementId", v)}
              />
            )}
          </SettingsSubCard>

          <SettingsSubCard
            title="Google Tag Manager"
            description="Manage all tracking tags from one container instead of hardcoding scripts."
            right={<Switch checked={tagManager.active} onChange={(v) => patch(setTagManager, tagManager, "active", v)} />}
          >
            {tagManager.active && (
              <Input
                label="Container ID"
                placeholder="GTM-XXXXXXX"
                leftIcon={<Tag className="h-4 w-4" />}
                value={tagManager.containerId as string}
                onChange={(v) => patch(setTagManager, tagManager, "containerId", v)}
              />
            )}
          </SettingsSubCard>

          <SettingsSubCard
            title="Meta Pixel"
            description="Track conversions for Facebook and Instagram ad campaigns."
            right={<Switch checked={pixel.active} onChange={(v) => patch(setPixel, pixel, "active", v)} />}
          >
            {pixel.active && (
              <Input
                label="Pixel ID"
                placeholder="1234567890123456"
                leftIcon={<Target className="h-4 w-4" />}
                value={pixel.pixelId as string}
                onChange={(v) => patch(setPixel, pixel, "pixelId", v)}
              />
            )}
          </SettingsSubCard>

          <SettingsSubCard
            title="Google reCAPTCHA"
            description="Protect public forms (contact, comments) from spam and bots."
            right={<Switch checked={recaptcha.active} onChange={(v) => patch(setRecaptcha, recaptcha, "active", v)} />}
          >
            {recaptcha.active && (
              <div className="space-y-4">
                <Input
                  label="Site Key"
                  leftIcon={<ShieldQuestion className="h-4 w-4" />}
                  value={recaptcha.siteKey as string}
                  onChange={(v) => patch(setRecaptcha, recaptcha, "siteKey", v)}
                />
                <Input
                  label="Secret Key"
                  type="password"
                  value={recaptcha.secretKey as string}
                  onChange={(v) => patch(setRecaptcha, recaptcha, "secretKey", v)}
                />
              </div>
            )}
          </SettingsSubCard>

          <SettingsSubCard
            title="Google Maps"
            description="Power location embeds (e.g. studio/office address on the contact page)."
            right={<Switch checked={maps.active} onChange={(v) => patch(setMaps, maps, "active", v)} />}
          >
            {maps.active && (
              <Input
                label="API Key"
                leftIcon={<MapPin className="h-4 w-4" />}
                value={maps.apiKey as string}
                onChange={(v) => patch(setMaps, maps, "apiKey", v)}
              />
            )}
          </SettingsSubCard>
        </div>

        <input type="hidden" name="integrationsConfigJson" value={integrationsConfigJson} />
        <SaveBar errorMessage={errorMessage} isPending={isPending} justSaved={justSaved} label="Save Integrations" />
      </form>
    </SettingsSection>
  );
}
