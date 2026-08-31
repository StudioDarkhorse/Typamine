import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/services/post";
import ArchivePostDetailClient from "./ArchivePostDetailClient";
import { buildPostMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface ArchivePostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArchivePostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Il post non esiste (o non e' pubblicato): la pagina fa notFound(), qui
  // basta restituire metadati fuori indice.
  if (!post) {
    return {
      title: "Not found",
      description: "This page is not in the Typamine archive.",
      robots: { index: false, follow: false },
    };
  }

  return buildPostMetadata({
    post,
    basePath: "/archive",
    titleSuffix: ": Vintage Typography",
    keywords: ["vintage typography","historical type","lettering reference","type specimen"],
  });
}

export default async function ArchivePostDetailPage({ params }: ArchivePostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <ArchivePostDetailClient post={post} />;
}
