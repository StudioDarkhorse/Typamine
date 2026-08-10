import { notFound } from "next/navigation";
import PostForm from "@/components/admin/post/PostForm";
import { getAdminPostById } from "@/lib/actions/post";
import { getAdminTags } from "@/lib/actions/tag";
import TabHeading from "@/components/admin/common/TabHeading";

export const dynamic = "force-dynamic";

interface EditArchivePostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArchivePostPage({ params }: EditArchivePostPageProps) {
  const { id } = await params;

  // Niente più getFonts() qui: il picker in PostForm (FontMultiPicker) è
  // self-fetching, 30 alla volta — l'intero catalogo non serve mai a questa pagina.
  const [post, tags] = await Promise.all([
    getAdminPostById(id),
    getAdminTags(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TabHeading
        title="Edit Archive Post"
        showButton={false}
      />
      <PostForm postType="ARCHIVE" initialData={post} tags={tags} />
    </div>
  );
}
