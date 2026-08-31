import { getIngredientBySlug } from "@/lib/services/font";
import FontConverterClient from "./FontConverterClient";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  path: "/labs/font-converter",
  title: "Font Converter: TTF, OTF & WOFF to WOFF2 Online",
  description:
    "Convert font files to web-ready formats in the browser: upload a TTF, OTF or WOFF and get WOFF2, WOFF and TTF back — individually or as a zip. No upload to a server, no signup.",
  keywords: [
    "font converter",
    "ttf to woff2",
    "otf to woff2",
    "convert font to web font",
    "woff2 converter",
    "online font converter",
    "ttf to otf",
  ],
});

interface FontConverterPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function FontConverterPage({ searchParams }: FontConverterPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;
  const initialIngredient = ingredientSlug ? await getIngredientBySlug(ingredientSlug) : null;

  return <FontConverterClient ingredientSlug={ingredientSlug} initialIngredient={initialIngredient} />;
}
