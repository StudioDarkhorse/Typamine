import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getIngredientBySlug } from "@/lib/services/font";
import { getPairingsCountForFont } from "@/lib/services/pairing";
import IngredientDetailClient from "./IngredientDetailClient";
import { buildMetadata, joinSentences, toMetaDescription } from "@/lib/seo";
import type { Metadata } from "next";

interface IngredientDetailPageProps {
  params: Promise<{ slug: string }>;
}

// getIngredientBySlug passa da unstable_cache, quindi la stessa chiamata qui e
// nel componente sotto e' una sola query: nessun costo aggiuntivo per i metadati.
export async function generateMetadata({ params }: IngredientDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = await getIngredientBySlug(slug);

  // Slug inesistente: la pagina fa notFound(), qui basta non indicizzare.
  if (!ingredient) {
    return buildMetadata({
      path: `/ingredients/${slug}`,
      title: "Font not found",
      description: "This typeface is not in the Typamine catalogue.",
      noIndex: true,
    });
  }

  const designer = ingredient.author?.name ?? ingredient.creator;
  const category = ingredient.category?.toLowerCase();
  const styles = ingredient.variants?.length ?? 0;

  const description = joinSentences(
    `${ingredient.name} is a${category ? ` ${category}` : ""} typeface${designer ? ` by ${designer}` : ""}${
      ingredient.licenseType ? ` (${ingredient.licenseType})` : ""
    }.`,
    styles > 0 ? `${styles} style${styles === 1 ? "" : "s"}${ingredient.isVariable ? ", variable font" : ""}.` : "",
    `Preview ${ingredient.name} live, check its licence and download the font files.`,
  );

  return buildMetadata({
    path: `/ingredients/${ingredient.slug}`,
    title: `${ingredient.name} Font: Preview, Licence & Download`,
    description: toMetaDescription(description),
    keywords: [
      `${ingredient.name} font`,
      `${ingredient.name} typeface`,
      `download ${ingredient.name}`,
      `${ingredient.name} free download`,
      ...(designer ? [`${designer} fonts`] : []),
      ...(category ? [`${category} fonts`] : []),
      ...(ingredient.isVariable ? ["variable font"] : []),
      ...(ingredient.tags ?? []).map((tag) => `${tag.name} fonts`),
    ],
  });
}

export default async function IngredientDetailPage({ params }: IngredientDetailPageProps) {
  const { slug } = await params;
  const ingredient = await getIngredientBySlug(slug);

  if (!ingredient) {
    notFound();
  }

  const pairingsCount = await getPairingsCountForFont(ingredient.id);

  // Il cookie di voto è httpOnly (anti-tampering via devtools/document.cookie),
  // quindi lo stato "già votato" va letto qui lato server invece che nel client.
  const cookieStore = await cookies();
  const hasVoted = Boolean(cookieStore.get(`tm_rated_${ingredient.id}`));

  return <IngredientDetailClient ingredient={ingredient} hasPairings={pairingsCount > 0} hasVoted={hasVoted} />;
}
