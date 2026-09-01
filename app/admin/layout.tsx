// src/app/[locale]/admin/layout.tsx
import { getServerAuthSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
import { getDatabaseSource } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeSync } from "@/components/common/ThemeSync";
import QueryProvider from "@/components/admin/QueryProvider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Typamine - Admin Panel",
  description: "Typamine - Admin Panel",
  icons: {
    icon: [{ url: "/images/icons/admin-icon.png" }]
  }
};


import prisma from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('[AdminLayout] Getting session with getServerSession...');

  try {
    const session = await getServerAuthSession();
    console.log('[AdminLayout] Session:', session ? 'exists' : 'null');

    if (!session) {
      console.log('[AdminLayout] No session, redirecting to login');
      redirect("/login");
    }

    const dbSource = getDatabaseSource();

    if (session?.user?.id) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { imageUrl: true, image: true, name: true, surname: true }
      });

      if (dbUser) {
        let avatarSrc = null;
        if (dbUser.imageUrl) {
          avatarSrc = dbUser.imageUrl;
        } else if (dbUser.image) {
          avatarSrc = `data:image/jpeg;base64,${Buffer.from(dbUser.image as any).toString('base64')}`;
        }
        session.user.image = avatarSrc || session.user.image;
        if (dbUser.name) {
          session.user.name = dbUser.surname ? `${dbUser.name} ${dbUser.surname}` : dbUser.name;
        }
      }
    }

    return (
      <html lang="en" className={cn("h-full antialiased", "font-sans", inter.variable)} suppressHydrationWarning>
        <body className="min-h-full bg-background text-foreground">
          <ThemeSync />
          <QueryProvider>
          <div className="flex h-[100dvh] transition-colors duration-300 overflow-hidden relative bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin/admin-bg.png')" }}
          >
            {/* Background elements moved to top and z-index fixed */}
            <div className="absolute inset-0 z-0 bg-linear-to-br from-blue-100/20 via-blue-200/40 to-bluegray-200/20 dark:from-ocragray-800/40 dark:via-redgray-400/40 dark:to-black/80 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-white),transparent_60%),transparent)] dark:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-red),var(--color-black)_90%),transparent)] pointer-events-none" />

            <AdminSidebar session={session} />
            <div className="flex-1 min-w-0 flex flex-col relative z-10">
              <div className="ps-6">

                <AdminHeader session={session} dbSource={dbSource} />
              </div>
              <main className="flex-1 min-w-0 p-6 pb-4 overflow-y-auto overflow-x-hidden relative z-10">
                {children}
              </main>
            </div>
          </div>
          </QueryProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error('[AdminLayout] Error:', error);
    redirect("/login");
  }
}