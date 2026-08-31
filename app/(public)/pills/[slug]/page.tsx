import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/services/post";
import PillDetailClient from "./PillDetailClient";
import { buildPostMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface PillDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PillDetailPageProps): Promise<Metadata> {
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
    basePath: "/pills",
    titleSuffix: ": Typography Guide",
    keywords: ["typography article","font guide","typography tips","web typography"],
  });
}

export default async function PillDetailPage({ params }: PillDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PillDetailClient post={post} />;
}
