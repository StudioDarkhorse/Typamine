import { notFound } from "next/navigation";
import { getFontAuthorBySlug } from "@/lib/services/fontAuthor";
import { getIngredientsByAuthorId } from "@/lib/services/font";
import AuthorDetailClient from "./AuthorDetailClient";
import { buildMetadata, joinSentences, toMetaDescription } from "@/lib/seo";
import type { Metadata } from "next";

interface AuthorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getFontAuthorBySlug(slug);

  if (!author) {
    return buildMetadata({
      path: `/author/${slug}`,
      title: "Designer not found",
      description: "This type designer is not in the Typamine directory.",
      noIndex: true,
    });
  }

  const fonts = await getIngredientsByAuthorId(author.id);
  const fontNames = fonts.slice(0, 3).map((font) => font.name).join(", ");
  const kind = author.type === "FOUNDRY" ? "type foundry" : author.type === "COLLECTIVE" ? "type collective" : "type designer";

  const description = joinSentences(
    `${author.name} is a ${kind} with ${fonts.length} typeface${fonts.length === 1 ? "" : "s"} on Typamine.`,
    fontNames ? `Fonts include ${fontNames}.` : "",
    toMetaDescription(author.bio, 70),
  );

  return buildMetadata({
    path: `/author/${author.slug}`,
    title: `${author.name}: Fonts & Typefaces`,
    description: toMetaDescription(description),
    keywords: [
      `${author.name} fonts`,
      `${author.name} typefaces`,
      `fonts by ${author.name}`,
      author.type === "FOUNDRY" ? "type foundry" : "type designer",
      ...fonts.slice(0, 5).map((font) => `${font.name} font`),
    ],
    image: author.avatarUrl ? { url: author.avatarUrl, alt: author.name } : undefined,
  });
}

export default async function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { slug } = await params;
  const author = await getFontAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const fonts = await getIngredientsByAuthorId(author.id);

  return <AuthorDetailClient author={author} fonts={fonts} />;
}
