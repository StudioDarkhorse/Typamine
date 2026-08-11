"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Wrench, X } from "lucide-react";
import { Input, Label } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Switch } from "@/components/common/Switch";
import { CustomRange } from "@/components/common/CustomRange";
import { SettingsSection, SettingsSubCard } from "@/components/admin/settings/SettingsSection";
import { SaveBar } from "@/components/admin/settings/SaveBar";
import { useSettingsForm } from "@/components/admin/settings/useSettingsForm";
import FontPicker from "@/components/common/FontPicker";
import MultiFontPicker from "@/components/common/MultiFontPicker";
import HexColorPickerPopover from "@/components/common/HexColorPickerPopover";
import { saveGeneralSettings } from "@/lib/actions/adminSettings";
import { getFontsByIds } from "@/lib/actions/font";
import { AdminSettings } from "@/types";

const MAX_HERO_WORDMARK_FONTS = 12;
const FONT_SIZE_PERCENT_MIN = 50;
const FONT_SIZE_PERCENT_MAX = 150;
const FONT_SIZE_PERCENT_STEP = 5;

interface HeroWordmarkFontRow {
  fontId: string;
  fontSizePercent: string;
}

function HeroWordmarkFontsField({
  value,
  onChange,
}: {
  value: HeroWordmarkFontRow[];
  onChange: (rows: HeroWordmarkFontRow[]) => void;
}) {
  const ids = useMemo(() => value.map((r) => r.fontId), [value]);
  const namesQuery = useQuery({
    queryKey: ["hero-wordmark-font-names", ids],
    queryFn: () => getFontsByIds(ids),
    enabled: ids.length > 0,
  });
  const nameById = useMemo(
    () => new Map((namesQuery.data ?? []).map((f) => [f.id, f.name])),
    [namesQuery.data]
  );

  return (
    <div className="space-y-4">
      <MultiFontPicker
        label="Hero Wordmark Fonts"
        values={ids}
        max={MAX_HERO_WORDMARK_FONTS}
        onChange={(newIds) => {
          const byId = new Map(value.map((r) => [r.fontId, r]));
          onChange(newIds.map((id) => byId.get(id) ?? { fontId: id, fontSizePercent: "100" }));
        }}
      />

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((row, idx) => (
            <div
              key={row.fontId}
              className="flex items-center gap-3 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2"
            >
              <span className="text-[10px] text-zinc-500 w-5 shrink-0">{idx + 1}.</span>
              <span className="flex-1 min-w-0 truncate text-sm text-black dark:text-white">
                {nameById.get(row.fontId) || "Loading..."}
              </span>
              <div className="w-36 shrink-0">
                <CustomRange
                  min={FONT_SIZE_PERCENT_MIN}
                  max={FONT_SIZE_PERCENT_MAX}
                  step={FONT_SIZE_PERCENT_STEP}
                  unit="%"
                  value={parseInt(row.fontSizePercent, 10) || 100}
                  onChange={(v) => {
                    const next = [...value];
                    next[idx] = { ...row, fontSizePercent: String(v) };
                    onChange(next);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== idx))}
                className="text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                title="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-ocragray-800 dark:text-zinc-200">
        The &quot;T&quot; cycles through these fonts in order, in the homepage hero — up to {MAX_HERO_WORDMARK_FONTS}.
        Each has its own size, same convention as the wordmark &quot;T&quot; above (100% = default size).
      </p>
    </div>
  );
}

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Italiano", value: "it" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
];

const TIMEZONE_OPTIONS = [
  { label: "UTC", value: "UTC" },
  { label: "Europe/Rome", value: "Europe/Rome" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "America/Los_Angeles", value: "America/Los_Angeles" },
];

function ModeColorField({
  label,
  defaultSwatch,
  value,
  onChange,
}: {
  label: string;
  defaultSwatch: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-3 mt-1">
        <HexColorPickerPopover color={value || defaultSwatch} onChange={onChange} title={label} />
        <span className="text-xs font-mono text-ocragray-800 dark:text-zinc-200">{value || "Default"}</span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-zinc-400 hover:text-red-500 transition-colors"
            title="Reset to default"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function GeneralTab({ initialSettings }: { initialSettings: AdminSettings }) {
  const [language, setLanguage] = useState(initialSettings.siteLanguage);
  const [timezone, setTimezone] = useState(initialSettings.siteTimezone);

  const [maintenanceActive, setMaintenanceActive] = useState(initialSettings.maintenanceActive);
  const [maintenanceMessage, setMaintenanceMessage] = useState(initialSettings.maintenanceMessage ?? "");

  const [letterTFontFamily, setLetterTFontFamily] = useState(initialSettings.letterTFontFamily ?? "");
  const [letterTFontSizePercent, setLetterTFontSizePercent] = useState(initialSettings.letterTFontSizePercent);
  const [logoLightModeColor, setLogoLightModeColor] = useState(initialSettings.logoLightModeColor ?? "");
  const [logoDarkModeColor, setLogoDarkModeColor] = useState(initialSettings.logoDarkModeColor ?? "");
  const [heroWordmarkFonts, setHeroWordmarkFonts] = useState<HeroWordmarkFontRow[]>(
    (initialSettings.heroWordmarkFonts ?? []).map((f) => ({
      fontId: f.fontId,
      fontSizePercent: String(f.fontSizePercent),
    }))
  );
  const [heroWordmarkLoop, setHeroWordmarkLoop] = useState(initialSettings.heroWordmarkLoop ?? true);
  const [heroWordmarkLoopSpeed, setHeroWordmarkLoopSpeed] = useState(initialSettings.heroWordmarkLoopSpeed ?? 0);

  const { errorMessage, dispatch, isPending, justSaved } = useSettingsForm(saveGeneralSettings);

  return (
    <SettingsSection title="General" subtitle="Site-wide identity and default locale">
      <form action={dispatch} className="space-y-10">
        <SettingsSubCard title="Site Identity" description="Basic locale defaults used across the admin panel and public site.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select label="Default Language" options={LANGUAGE_OPTIONS} value={language} onChange={setLanguage} />
            <Select label="Default Timezone" options={TIMEZONE_OPTIONS} value={timezone} onChange={setTimezone} />
          </div>
          <input type="hidden" name="siteLanguage" value={language} />
          <input type="hidden" name="siteTimezone" value={timezone} />
        </SettingsSubCard>

        <SettingsSubCard
          title="Brand Identity"
          description={'Customize the initial "T" in the Typamine wordmark, shown in the site footer.'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mb-16">
            <div className="">
              <FontPicker
                label='Letter "T" Font'
                value={letterTFontFamily}
                onChange={setLetterTFontFamily}
                placeholder="Default (Star Avenue)"
              />
            </div>
            <CustomRange
              min={FONT_SIZE_PERCENT_MIN}
              max={FONT_SIZE_PERCENT_MAX}
              step={FONT_SIZE_PERCENT_STEP}
              unit="%"
              label='"T" Size (% of wordmark)'
              value={letterTFontSizePercent}
              onChange={setLetterTFontSizePercent}
            />
          </div>

          <input type="hidden" name="letterTFontFamily" value={letterTFontFamily} />
          <input type="hidden" name="letterTFontSizePercent" value={letterTFontSizePercent} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ModeColorField
              label="Square Color — Light Mode"
              defaultSwatch="#4FE8E8"
              value={logoLightModeColor}
              onChange={setLogoLightModeColor}
            />
            <ModeColorField
              label="Square Color — Dark Mode"
              defaultSwatch="#FF3132"
              value={logoDarkModeColor}
              onChange={setLogoDarkModeColor}
            />
          </div>

          <input type="hidden" name="logoLightModeColor" value={logoLightModeColor} />
          <input type="hidden" name="logoDarkModeColor" value={logoDarkModeColor} />
        </SettingsSubCard>

        <SettingsSubCard
          title="Hero Wordmark Animation"
          description='Pick up to 12 fonts for the animated "T" shown in the homepage hero — it cycles through them in a smooth flip, like a split-flap display.'
          right={
            <Switch
              checked={heroWordmarkLoop}
              onChange={setHeroWordmarkLoop}
              name="heroWordmarkLoop"
              id="hero-wordmark-loop"
              label="Loop"
            />
          }
        >
          <HeroWordmarkFontsField value={heroWordmarkFonts} onChange={setHeroWordmarkFonts} />
          <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 -mt-2">
            {heroWordmarkLoop
              ? "Loops through the fonts forever."
              : "Plays through the fonts once, then stops on the last one."}
          </p>

          <div className="grid grid-cols-1 gap-6">
            <CustomRange
              label="Loop Speed"
              min={-5}
              max={5}
              step={0.1}
              value={heroWordmarkLoopSpeed}
              onChange={setHeroWordmarkLoopSpeed}
            />
          </div>
          <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 -mt-4">
            0 = normal speed, -5 = slowest, 5 = fastest.
          </p>
          <input type="hidden" name="heroWordmarkLoopSpeed" value={heroWordmarkLoopSpeed} />

          <input
            type="hidden"
            name="heroWordmarkFontsJson"
            value={JSON.stringify(
              heroWordmarkFonts.map((f) => ({
                fontId: f.fontId,
                fontSizePercent: parseInt(f.fontSizePercent, 10) || 100,
              }))
            )}
          />
        </SettingsSubCard>

        <SettingsSubCard
          title="Maintenance Mode"
          description="Take the public website offline behind a maintenance message while you make changes."
          right={
            <Switch
              checked={maintenanceActive}
              onChange={setMaintenanceActive}
              name="maintenanceActive"
              id="maintenance-active"
            />
          }
        >
          <label htmlFor="maintenance-active" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-bluegray-800 dark:text-redgray-200 -mt-2 cursor-pointer">
            <Wrench className="h-3.5 w-3.5" />
            Maintenance Mode Active
          </label>
          {maintenanceActive && (
            <Input
              as="textarea"
              rows={3}
              name="maintenanceMessage"
              label="Maintenance Message"
              value={maintenanceMessage}
              onChange={setMaintenanceMessage}
            />
          )}
        </SettingsSubCard>

        <SaveBar errorMessage={errorMessage} isPending={isPending} justSaved={justSaved} label="Save General Settings" />
      </form>
    </SettingsSection>
  );
}
