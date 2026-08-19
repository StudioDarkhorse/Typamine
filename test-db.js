const { PrismaClient } = require("./prisma/generated-client");

async function main() {
  console.log("Initializing PrismaClient...");
  const prisma = new PrismaClient();
  try {
    console.log("Querying ingredients...");
    const ingredients = await prisma.ingredient.findMany({
      select: { id: true, name: true, slug: true },
      take: 5
    });
    console.log("Success! Query returned:", ingredients);
  } catch (err) {
    console.error("Query failed with error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
