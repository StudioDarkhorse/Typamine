import { getIngredientBySlug, getLabsFontCatalog } from "@/lib/services/font";
import FontFaceGeneratorClient from "./FontFaceGeneratorClient";

export const dynamic = "force-dynamic";

interface FontFaceGeneratorPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function FontFaceGeneratorPage({ searchParams }: FontFaceGeneratorPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;

  const [initialIngredient, catalog] = await Promise.all([
    ingredientSlug ? getIngredientBySlug(ingredientSlug) : Promise.resolve(null),
    getLabsFontCatalog(200),
  ]);

  return (
    <FontFaceGeneratorClient
      initialIngredient={initialIngredient}
      catalog={catalog}
      ingredientSlug={ingredientSlug}
    />
  );
}
