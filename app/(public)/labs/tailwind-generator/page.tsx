import { getIngredientBySlug, getLabsFontCatalog } from "@/lib/services/font";
import TailwindGeneratorClient from "./TailwindGeneratorClient";

export const dynamic = "force-dynamic";

interface TailwindGeneratorPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function TailwindGeneratorPage({ searchParams }: TailwindGeneratorPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;

  const [initialIngredient, catalog] = await Promise.all([
    ingredientSlug ? getIngredientBySlug(ingredientSlug) : Promise.resolve(null),
    getLabsFontCatalog(200),
  ]);

  return (
    <TailwindGeneratorClient
      initialIngredient={initialIngredient}
      catalog={catalog}
      ingredientSlug={ingredientSlug}
    />
  );
}
