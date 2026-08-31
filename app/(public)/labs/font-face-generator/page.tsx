import { getIngredientBySlug, getLabsFontCatalog } from "@/lib/services/font";
import FontFaceGeneratorClient from "./FontFaceGeneratorClient";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  path: "/labs/font-face-generator",
  title: "@font-face CSS Generator for Web Fonts",
  description:
    "Generate ready-to-paste @font-face CSS for any web font: pick weights and styles, set font-display and unicode-range, and copy the rules straight into your stylesheet.",
  keywords: [
    "font face generator",
    "@font-face css",
    "css font generator",
    "web font css",
    "font-display swap",
    "self hosted fonts",
    "embed font in css",
  ],
});

interface FontFaceGeneratorPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function FontFaceGeneratorPage({ searchParams }: FontFaceGeneratorPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;

  const [initialIngredient, catalog] = await Promise.all([
    ingredientSlug ? getIngredientBySlug(ingredientSlug) : Promise.resolve(null),
    getLabsFontCatalog(200),
  ]);

  return (
    <FontFaceGeneratorClient
      initialIngredient={initialIngredient}
      catalog={catalog}
      ingredientSlug={ingredientSlug}
    />
  );
}
