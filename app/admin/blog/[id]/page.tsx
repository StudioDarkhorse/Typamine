import { notFound } from "next/navigation";
import PostForm from "@/components/admin/post/PostForm";
import { getAdminPostById } from "@/lib/actions/post";
import { getAdminTags } from "@/lib/actions/tag";
import TabHeading from "@/components/admin/common/TabHeading";

export const dynamic = "force-dynamic";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;

  // Niente più getFonts() qui: i post BLOG non hanno font picker (vedi
  // PostForm), e ARCHIVE usa FontMultiPicker self-fetching — l'intero
  // catalogo non serve mai a questa pagina.
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
        title="Edit Blog Post"
        showButton={false}
      />
      <PostForm postType="BLOG" initialData={post} tags={tags} />
    </div>
  );
}
