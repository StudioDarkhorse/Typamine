import PostForm from "@/components/admin/post/PostForm";
import { getAdminTags } from "@/lib/actions/tag";
import TabHeading from "@/components/admin/common/TabHeading";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  // Niente più getFonts() qui: i post BLOG non hanno font picker (vedi PostForm).
  const tags = await getAdminTags();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TabHeading
        title="New Blog Post"
        showButton={false}
      />
      <PostForm postType="BLOG" tags={tags} />
    </div>
  );
}
