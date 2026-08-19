import { getIngredientBySlug, getLabsFontCatalog } from "@/lib/services/font";
import WcagCheckerClient from "./WcagCheckerClient";

export const dynamic = "force-dynamic";

interface WcagPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

export default async function WcagPage({ searchParams }: WcagPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;

  const [initialIngredient, catalog] = await Promise.all([
    ingredientSlug ? getIngredientBySlug(ingredientSlug) : Promise.resolve(null),
    getLabsFontCatalog(200),
  ]);

  return (
    <WcagCheckerClient
      initialIngredient={initialIngredient}
      catalog={catalog}
      ingredientSlug={ingredientSlug}
    />
  );
}
