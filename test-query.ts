import { getIngredientsPage } from "./lib/services/font";

async function main() {
  console.log("Running getIngredientsPage test...");
  try {
    const result = await getIngredientsPage({ perPage: 200, sort: "name_asc" });
    console.log("Success! Items count:", result.items.length);
    console.log("Total count:", result.total);
  } catch (err: any) {
    console.error("Caught error:", err);
  }
}

main();
