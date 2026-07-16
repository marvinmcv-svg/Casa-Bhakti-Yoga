import { db } from "../src/lib/db";
import { seedDatabase } from "../src/lib/default-content";

async function main() {
  console.log("Force-reseeding database with improved copy...");
  const result = await seedDatabase(true);
  console.log("Result:", JSON.stringify(result));

  // Verify content count
  const count = await db.siteContent.count();
  console.log(`✓ SiteContent rows: ${count}`);

  // Show a sample
  const sample = await db.siteContent.findUnique({ where: { key: "hero.subtitle" } });
  console.log("hero.subtitle EN:", sample?.valueEn);
  console.log("hero.subtitle ES:", sample?.valueEs);

  const heroLine1 = await db.siteContent.findUnique({ where: { key: "hero.line1" } });
  console.log("hero.line1 EN:", heroLine1?.valueEn);

  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
