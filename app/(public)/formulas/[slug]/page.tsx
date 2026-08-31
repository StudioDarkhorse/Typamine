import { notFound } from "next/navigation";
import { getFormulaBySlug } from "@/lib/services/formula";
import { getVirtualFormulaBySlug } from "@/lib/services/virtualFormula";
import FormulaDetailClient from "./FormulaDetailClient";
import { buildMetadata, joinSentences, toMetaDescription } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface FormulaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FormulaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Stesso ordine di risoluzione della pagina: prima le formule reali, poi
  // quelle virtuali, cosi' i metadati non descrivono mai un'entita' diversa
  // da quella renderizzata.
  const formula = (await getFormulaBySlug(slug)) ?? (await getVirtualFormulaBySlug(slug));

  if (!formula) {
    return buildMetadata({
      path: `/formulas/${slug}`,
      title: "Font collection not found",
      description: "This font collection is not in the Typamine catalogue.",
      noIndex: true,
    });
  }

  const fontNames = (formula.fonts ?? []).map((font) => font.name);
  const previewNames = fontNames.slice(0, 4).join(", ");

  const description = joinSentences(
    formula.description ? toMetaDescription(formula.description, 90) : `${formula.name}: a curated collection of ${fontNames.length} typefaces.`,
    previewNames ? `Includes ${previewNames}${fontNames.length > 4 ? " and more" : ""}.` : "",
    "Preview every font in the set and download the ones you need.",
  );

  return buildMetadata({
    path: `/formulas/${formula.slug}`,
    title: `${formula.name}: Font Collection`,
    description: toMetaDescription(description),
    keywords: [
      `${formula.name} fonts`,
      `${formula.name} font collection`,
      "curated font collection",
      "font sets",
      ...(formula.fontCategory ? [`${formula.fontCategory.toLowerCase()} fonts`] : []),
      ...(formula.tags ?? []).map((tag) => `${tag.name} fonts`),
      ...fontNames.slice(0, 4).map((name) => `${name} font`),
    ],
  });
}

export default async function FormulaDetailPage({ params }: FormulaDetailPageProps) {
  const { slug } = await params;

  // Prima le collezioni curate a mano nel DB reale, poi quelle programmatiche
  // (lib/services/virtualFormula.ts) — così uno slug reale ha sempre la
  // precedenza in caso di collisione col namespace delle formule generate.
  const realFormula = await getFormulaBySlug(slug);
  if (realFormula) {
    return <FormulaDetailClient formula={realFormula} isCurated={true} />;
  }

  const virtualFormula = await getVirtualFormulaBySlug(slug);
  if (virtualFormula) {
    return <FormulaDetailClient formula={virtualFormula} isCurated={false} />;
  }

  notFound();
}
