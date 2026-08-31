import { notFound } from "next/navigation";
import { getPairingBySlug } from "@/lib/services/pairing";
import PrescriptionDetailClient from "./PrescriptionDetailClient";
import { buildMetadata, joinSentences, toMetaDescription } from "@/lib/seo";
import type { Metadata } from "next";

interface PrescriptionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PrescriptionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prescription = await getPairingBySlug(slug);

  if (!prescription) {
    return buildMetadata({
      path: `/prescriptions/${slug}`,
      title: "Font pairing not found",
      description: "This font pairing is not in the Typamine catalogue.",
      noIndex: true,
    });
  }

  const primary = prescription.primaryFont?.name;
  const secondary = prescription.secondaryFont?.name;
  const combo = primary && secondary ? `${primary} + ${secondary}` : primary ?? secondary;

  const description = joinSentences(
    combo ? `${combo}: a font pairing for headings and body text.` : `${prescription.name}: a curated font pairing.`,
    toMetaDescription(prescription.description || prescription.insight, 90),
    "See it applied to real copy and download both typefaces.",
  );

  return buildMetadata({
    path: `/prescriptions/${prescription.slug ?? slug}`,
    title: combo ? `${combo}: Font Pairing` : `${prescription.name}: Font Pairing`,
    description: toMetaDescription(description),
    keywords: [
      ...(combo ? [`${combo} pairing`] : []),
      ...(primary ? [`${primary} font pairing`, `fonts that pair with ${primary}`] : []),
      ...(secondary ? [`${secondary} font pairing`] : []),
      "font pairing",
      "font combinations",
      "heading and body font",
      ...(prescription.tags ?? []).map((tag) => (typeof tag === "string" ? tag : tag.name)),
    ],
    // La cover della prescription e' piu' rappresentativa del logo, quando c'e'.
    image: prescription.imageUrl ? { url: prescription.imageUrl, alt: prescription.name } : undefined,
  });
}

export default async function PrescriptionDetailPage({ params }: PrescriptionDetailPageProps) {
  const { slug } = await params;
  const prescription = await getPairingBySlug(slug);

  if (!prescription) {
    notFound();
  }

  return <PrescriptionDetailClient prescription={prescription} />;
}
