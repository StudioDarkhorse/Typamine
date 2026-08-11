"use client";

import { Bell, LogOut, User, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/common/Button";

export default function AdminHeader({ session, dbSource }: { session: any; dbSource?: string }) {
  return (
    <div className="pt-4 px-6 lg:pl-0 sticky top-0 z-20">
      <header className="h-20 rounded-lg border  bg-bluegray-100 dark:bg-redgray-900/50  border-black/5 dark:border-white/5 backdrop-blur-xl flex items-center justify-between px-2 transition-colors duration-300 shadow-xl">

        <div className="flex w-full justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-md bg-bluegray-200 dark:bg-redgray-800 flex items-center justify-center text-black dark:text-white border border-white dark:border-black shadow-sm overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} className="h-full w-full object-cover" alt="Avatar" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div className="text-left hidden sm:flex flex-col justify-center self-stretch gap-1">
              <div className="flex items-center">
                <p className="text-2xl font-rezland text-black dark:text-white leading-none">{session.user.name}</p>

              </div>

              <div className="flex flex-wrap gap-1">
                {session.user.roles?.map((role: string) => (
                  <span key={role} className="px-2 py-1 rounded-md bg-bluegray-200 dark:bg-redgray-800 text-black dark:text-white flex items-center gap-1 border border-bluegray-800 dark:border-redgray-200 shadow-xs">
                    <Shield className="h-2.5 w-2.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{role.replace(/_/g, " ")}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>


          {/* Glowing Database Status Badge */}
          {process.env.NODE_ENV === 'development' && dbSource && (
            <div className="hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-white/40 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-md transition-all duration-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dbSource === "Cloudflare D1" ? "bg-emerald-400 dark:bg-emerald-500" : "bg-amber-400 dark:bg-amber-500"}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dbSource === "Cloudflare D1" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-ocragray-800 dark:text-zinc-200">
                Database: <span className={dbSource === "Cloudflare D1" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>{dbSource}</span>
              </span>
            </div>
          )}


          <div className="flex items-center gap-3 pe-4">
            <div className="h-8 w-px bg-bluegray-300 dark:bg-redgray-200 mx-2"></div>

            <button className="p-2 text-bluegray-300 dark:text-redgray-200 hover:text-bluegray-800 dark:hover:text-white transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 glow-red-200 rounded-full"></span>
            </button>
            <Button
              variant="danger"
              size="sm"
              roundness="md"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-3 w-3 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
