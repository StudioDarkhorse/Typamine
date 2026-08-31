import { getIngredientBySlug, getLabsFontCatalog } from "@/lib/services/font";
import WcagCheckerClient from "./WcagCheckerClient";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  path: "/labs/wcag",
  title: "WCAG Typography Checker: Test Font Accessibility",
  description:
    "Check a typeface against WCAG 2.2: contrast ratios, reflow at 320px, 200% resize, text spacing, font overrides and character legibility — with a copy-paste report at the end.",
  keywords: [
    "wcag checker",
    "font accessibility",
    "accessible typography",
    "wcag 2.2 text",
    "contrast ratio checker",
    "readable fonts accessibility",
    "text spacing wcag",
  ],
});

interface WcagPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function WcagPage({ searchParams }: WcagPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;

  const [initialIngredient, catalog] = await Promise.all([
    ingredientSlug ? getIngredientBySlug(ingredientSlug) : Promise.resolve(null),
    getLabsFontCatalog(200),
  ]);

  return (
    <WcagCheckerClient
      initialIngredient={initialIngredient}
      catalog={catalog}
      ingredientSlug={ingredientSlug}
    />
  );
}
