"use client";

import {
  SlidersHorizontal,
  Megaphone,
  Mail,
  Plug,
  Bell,
  ShieldCheck,
  Scale,
} from "lucide-react";
import TabHeading from "@/components/admin/common/TabHeading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/common/Tabs";
import GeneralTab from "@/components/admin/settings/tabs/GeneralTab";
import PromoWebsiteCommunicationTab from "@/components/admin/settings/tabs/PromoWebsiteCommunicationTab";
import AdminCommunicationTab from "@/components/admin/settings/tabs/AdminCommunicationTab";
import IntegrationsTab from "@/components/admin/settings/tabs/IntegrationsTab";
import NotificationsTab from "@/components/admin/settings/tabs/NotificationsTab";
import LegalTab from "@/components/admin/settings/tabs/LegalTab";
import { AdminSettings } from "@/types";

const SECTIONS: { value: string; label: string; icon: any; Component: any }[] = [
  { value: "general", label: "General", icon: SlidersHorizontal, Component: GeneralTab },
  { value: "promo", label: "Promo Website Communication", icon: Megaphone, Component: PromoWebsiteCommunicationTab },
  { value: "admin-communication", label: "Admin Communication", icon: Mail, Component: AdminCommunicationTab },
  { value: "integrations", label: "Integrations", icon: Plug, Component: IntegrationsTab },
  { value: "notifications", label: "Notifications", icon: Bell, Component: NotificationsTab },
  { value: "legal", label: "Legal & Compliance", icon: Scale, Component: LegalTab },
];

export default function SettingsView({ adminSettings }: { adminSettings: AdminSettings }) {
  return (
    <div className="space-y-8 pb-20">
      <TabHeading
        title="Settings"
        showButton={false}
      />

     <div className="flex flex-col backdrop-blur-md bg-white/20 dark:bg-black/20 p-4 rounded-xl">
     
      <Tabs defaultValue="general" orientation="vertical" className="">
        <TabsList>
          {SECTIONS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} icon={<Icon className="h-4 w-4 shrink-0" />}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map(({ value, Component }) => (
          <TabsContent key={value} value={value}>
            <Component initialSettings={adminSettings} />
          </TabsContent>
        ))}
      </Tabs>
     </div>
    </div>
  );
}
