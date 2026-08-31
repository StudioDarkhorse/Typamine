import { getIngredientBySlug, getLabsFontCatalog } from "@/lib/services/font";
import TailwindGeneratorClient from "./TailwindGeneratorClient";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  path: "/labs/tailwind-generator",
  title: "Tailwind CSS Font Config Generator",
  description:
    "Turn any typeface into a Tailwind CSS font configuration: generate the fontFamily theme keys, the matching @font-face rules and the utility classes to use in your markup.",
  keywords: [
    "tailwind font config",
    "tailwind custom font",
    "tailwind css typography",
    "add font to tailwind",
    "tailwind fontfamily",
    "tailwind theme fonts",
  ],
});

interface TailwindGeneratorPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function TailwindGeneratorPage({ searchParams }: TailwindGeneratorPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;

  const [initialIngredient, catalog] = await Promise.all([
    ingredientSlug ? getIngredientBySlug(ingredientSlug) : Promise.resolve(null),
    getLabsFontCatalog(200),
  ]);

  return (
    <TailwindGeneratorClient
      initialIngredient={initialIngredient}
      catalog={catalog}
      ingredientSlug={ingredientSlug}
    />
  );
}
