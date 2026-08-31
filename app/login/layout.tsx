import type { Metadata } from "next";
import "../globals.css";
import { ThemeSync } from "@/components/common/ThemeSync";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Sign in | Typamine",
  description: "Typamine admin area.",
  // Area riservata: fuori dall'indice, e nessun link seguito da qui.
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", inter.variable)}>
      <head>
        <link rel="icon" href="/images/icons/icon-admin.png"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('typamine-theme');
                if (saved === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
