// src/app/[locale]/admin/page.tsx
import Link from "next/link";
import { LibraryBig, Blend, Tag as TagIcon, Feather, FolderClosed } from "lucide-react";
import { getServerAuthSession } from "@/lib/session";
import { hasPermission } from "@/lib/rbac";
import {
  hasFontsNeedingQualityReview,
  hasFontsNeedingIdentityDetection,
  getFontsNeedingManualAuthorCount,
  getFontsNeedingManualLicenseCount,
  getFontsNeedingDafontScrapeCount,
} from "@/lib/actions/font";
import AIFontQualityButton from "@/components/admin/AIFontQualityButton";
import AIFontIdentityButton from "@/components/admin/AIFontIdentityButton";
import FillMissingAuthorsCard from "@/components/admin/FillMissingAuthorsCard";
import FillMissingLicensesCard from "@/components/admin/FillMissingLicensesCard";
import ForceDafontScrapingCard from "@/components/admin/ForceDafontScrapingCard";
import ScrapeFromDafontCard from "@/components/admin/ScrapeFromDafontCard";
import { Card } from "@/components/common/Card";

interface QuickAction {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <Link href={action.href}>
      <Card roundness="lg" visualHover className="!h-fit cursor-pointer">
        <div className="p-2 flex items-center gap-4">
          <div className={`h-8 w-8 shrink-0 rounded-2xl border flex items-center justify-center ${action.colorClass}`}>
            {action.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-black dark:text-white truncate">{action.label}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 truncate">
              {action.description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default async function AdminDashboard() {
  console.log('[AdminDashboard] Getting session with getServerSession...');

  // Usa getServerSession con authOptions
  const session = await getServerAuthSession();
  console.log('[AdminDashboard] Session:', session ? 'exists' : 'null');

  if (!session) {
    console.log('[AdminDashboard] No session, redirecting to login');
    // Il redirect sarà gestito dal layout
  }

  // Due bottoni AI indipendenti: qualita' (rating+tag, candidato = nessun
  // tag ancora assegnato) e identita' (autore+licenza, candidato = authorId
  // su placeholder d'import o licenseType non settato). Visibili solo se
  // esistono font che ne hanno bisogno.
  const canReadFonts = hasPermission(session, "font", "read");
  const showAIQualityReview = canReadFonts && (await hasFontsNeedingQualityReview());
  const showAIIdentityDetection = canReadFonts && (await hasFontsNeedingIdentityDetection());
  const missingAuthorCount = canReadFonts ? await getFontsNeedingManualAuthorCount() : 0;
  const missingLicenseCount = canReadFonts ? await getFontsNeedingManualLicenseCount() : 0;
  const dafontScrapeCount = canReadFonts ? await getFontsNeedingDafontScrapeCount() : 0;
  const canImportFonts = hasPermission(session, "font", "create");

  // Archive/blog/pairings/collections condividono il permesso "font" per la
  // create, stessa convenzione già usata nelle rispettive list page.
  const canCreateContent = hasPermission(session, "font", "create");
  const canCreateTag = hasPermission(session, "tag", "create");

  const quickActions: QuickAction[] = [
    ...(canCreateContent ? [{
      href: "/admin/archive/new",
      label: "Create Archive",
      description: "New archive post",
      icon: <LibraryBig className="h-5 w-5 text-blue" />,
      colorClass: "bg-blue/10 border-blue/20",
    }] : []),
    ...(canCreateContent ? [{
      href: "/admin/blog/new",
      label: "Create Blog Post",
      description: "New blog entry",
      icon: <Feather className="h-5 w-5 text-red" />,
      colorClass: "bg-red/10 border-red/20",
    }] : []),
    ...(canCreateTag ? [{
      href: "/admin/tags",
      label: "Add Tag",
      description: "New content tag",
      icon: <TagIcon className="h-5 w-5 text-cyan-500" />,
      colorClass: "bg-cyan-500/10 border-cyan-500/20",
    }] : []),
    ...(canCreateContent ? [{
      href: "/admin/pairings/new",
      label: "Add Pairing",
      description: "New font pairing",
      icon: <Blend className="h-5 w-5 text-emerald-500" />,
      colorClass: "bg-emerald-500/10 border-emerald-500/20",
    }] : []),
    ...(canCreateContent ? [{
      href: "/admin/collections/new",
      label: "Add Collection",
      description: "New font collection",
      icon: <FolderClosed className="h-5 w-5 text-amber-500" />,
      colorClass: "bg-amber-500/10 border-amber-500/20",
    }] : []),
  ];

  const hasQuickActions = showAIQualityReview || showAIIdentityDetection || quickActions.length > 0;

  return (
    <div className="flex h-full gap-8 items-start">
      {/* Spazio rimanente (fuori da Quick Actions): griglia 2 colonne x 3
          righe, ogni widget del dashboard occupa una cella (1 col, 1 row) —
          per ora solo "Fill Missing Authors", altri ne seguiranno. */}
      <div className="flex-1 ">
        <h2 className="mb-3 text-4xl font-rezland font-black uppercase tracking-widest text-center text-white dark:text-red-200">
          Key Tasks
        </h2>

        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          {missingAuthorCount > 0 && <FillMissingAuthorsCard count={missingAuthorCount} />}
          {missingLicenseCount > 0 && <FillMissingLicensesCard count={missingLicenseCount} />}
          {dafontScrapeCount > 0 && <ForceDafontScrapingCard count={dafontScrapeCount} />}
          {canImportFonts && <ScrapeFromDafontCard />}
        </div>
      </div>

      {hasQuickActions && (
        <div className="space-y-3 w-1/4 shrink-0">
          <h2 className="text-4xl font-rezland font-black uppercase tracking-widest text-center text-white dark:text-red-200">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {showAIQualityReview && <AIFontQualityButton />}
            {showAIIdentityDetection && <AIFontIdentityButton />}
            {quickActions.map(action => (
              <QuickActionCard key={action.href + action.label} action={action} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}