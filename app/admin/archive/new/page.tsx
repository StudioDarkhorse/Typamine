import PostForm from "@/components/admin/post/PostForm";
import { getAdminTags } from "@/lib/actions/tag";
import TabHeading from "@/components/admin/common/TabHeading";

export const dynamic = "force-dynamic";

export default async function NewArchivePostPage() {
  // Niente più getFonts() qui: il picker in PostForm (FontMultiPicker) è
  // self-fetching, 30 alla volta.
  const tags = await getAdminTags();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TabHeading
        title="New Archive Post"
        showButton={false}
      />
      <PostForm postType="ARCHIVE" tags={tags} />
    </div>
  );
}
