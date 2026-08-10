import { notFound } from "next/navigation";
import PairingForm from "@/components/admin/pairings/PairingForm";
import { getAdminPairingById } from "@/lib/actions/pairing";
import { getAdminTags } from "@/lib/actions/tag";
import TabHeading from "@/components/admin/common/TabHeading";

export const dynamic = "force-dynamic";

interface EditPairingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPairingPage({ params }: EditPairingPageProps) {
  const { id } = await params;

  // Niente più getFonts() qui: FontPicker in PairingForm è self-fetching
  // (30 alla volta via getFontsPage), l'intero catalogo non serve più.
  const [pairing, tags] = await Promise.all([
    getAdminPairingById(id),
    getAdminTags(),
  ]);

  if (!pairing) {
    notFound();
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TabHeading
        title="Edit Pairing"
        showButton={false}
      />
      <PairingForm initialData={pairing} tags={tags} />
    </div>
  );
}
