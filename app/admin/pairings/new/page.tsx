import PairingForm from "@/components/admin/pairings/PairingForm";
import { getAdminTags } from "@/lib/actions/tag";
import TabHeading from "@/components/admin/common/TabHeading";

export const dynamic = "force-dynamic";

export default async function NewPairingPage() {
  // Niente più getFonts() qui: FontPicker in PairingForm è self-fetching
  // (30 alla volta via getFontsPage), l'intero catalogo non serve più.
  const tags = await getAdminTags();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TabHeading
        title="New Pairing"
        showButton={false}
      />
      <PairingForm tags={tags} />
    </div>
  );
}
