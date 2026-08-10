"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Tent,
  Settings,
  Shield,
  UserCog,
  Type,
  Tag,
  Blend,
  FolderClosed,
  LibraryBig,
  Feather,
  IdCard
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SeventiesThemeToggle } from "@/components/common/SeventiesThemeToggle";
import DynamicLogo from "@/components/layout/DynamicLogo";
import { useThemeStore } from "@/store/themeStore";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { canAccessResource, Resource } from "@/lib/rbac";

const menuItems: { name: string; href: string; icon: any; resource?: Resource }[] = [
  { name: "Dashboard", href: "/admin", icon: Tent },
  { name: "Fonts", href: "/admin/fonts", icon: Type },
  { name: "Font Authors", href: "/admin/font-authors", icon: IdCard },
  { name: "Tags", href: "/admin/tags", icon: Tag },
  { name: "Pairings", href: "/admin/pairings", icon: Blend },
  { name: "Collections", href: "/admin/collections", icon: FolderClosed },
  { name: "Archive", href: "/admin/archive", icon: LibraryBig },
  { name: "Blog", href: "/admin/blog", icon: Feather },
  { name: "Users", href: "/admin/users", icon: UserCog, resource: 'user' },
  { name: "User Roles", href: "/admin/roles", icon: Shield, resource: 'role' },
  { name: "Settings", href: "/admin/settings", icon: Settings, resource: 'setting' },
];

export default function AdminSidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);
  const [collapsed, setCollapsed] = useState(false);

  const filteredMenuItems = menuItems.filter(item =>
    !item.resource || canAccessResource(session, item.resource)
  );

  return (
    <div
      className={cn(
        "hidden lg:flex h-[100dvh] shrink-0 relative z-10 transition-all duration-500 ease-in-out",
        collapsed ? "w-[96px] px-3 py-4" : "w-[250px] p-4"
      )}
    >
      <aside className="w-full h-full rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500">

        <div className={cn(
          "flex items-center justify-center shrink-0 transition-all duration-500 bg-bluegray-100 dark:bg-redgray-900/50",
          collapsed ? "h-16" : "h-22 pb-1"
        )}>
          <DynamicLogo
            className="text-black dark:text-white"
            height={collapsed ? 48 : 92}
            squareGlow={theme === "light"}
            squareIsButton={true}
            squareButtonAction={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 border-t border-black/5 dark:border-white/5 px-3 py-2 flex flex-col justify-center space-y-1 overflow-y-auto overflow-x-hidden">
          {filteredMenuItems.map((item) => {
            const isActive = item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href as any}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md transition-all duration-300 group",
                  collapsed ? "justify-center" : "justify-start gap-3",
                  isActive
                    ? "bg-bluegray-100 dark:bg-redgray-800 text-black dark:text-white shadow-sm"
                    : "text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80 hover:bg-bluegray-100/60 dark:hover:bg-redgray-800/60"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors duration-300", isActive ? "text-black dark:text-white" : "text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80")} />
                <span className={cn(
                  "font-otfits font-extrabold uppercase tracking-tighter text-[15px] leading-none whitespace-nowrap transition-all duration-500 ease-in-out",
                  collapsed ? "opacity-0 w-0 scale-90 translate-x-[-10px] pointer-events-none" : "opacity-100 w-auto scale-100 translate-x-0"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={cn(
          "border-t  bg-bluegray-100 dark:bg-redgray-900/50  border-black/5 dark:border-white/5 transition-all duration-500 shrink-0",
          collapsed ? "h-16 flex items-center justify-center p-0" : "p-3"
        )}>
          <SeventiesThemeToggle size={collapsed ? 26 : 32} variant={collapsed ? "mini" : "full"} />
        </div>
      </aside>
    </div>
  );
}
