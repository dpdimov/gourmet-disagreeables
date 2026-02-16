import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

function extractIngredientTags(ingredientText: string): string[] {
  const stopWords = new Set([
    "a", "an", "the", "of", "to", "and", "or", "for", "with", "in", "on",
    "at", "by", "from", "as", "into", "about", "large", "small", "medium",
    "fresh", "freshly", "dried", "ground", "finely", "roughly", "thinly",
    "chopped", "diced", "minced", "sliced", "grated", "crushed", "peeled",
    "cubed", "halved", "quartered", "torn", "shredded", "julienned",
    "optional", "plus", "extra", "more", "taste", "serve", "serving",
    "tbsp", "tsp", "cup", "cups", "ml", "g", "kg", "oz", "lb", "lbs",
    "tablespoon", "tablespoons", "teaspoon", "teaspoons", "pinch", "handful",
    "bunch", "tin", "can", "jar", "packet", "pack", "stick", "sticks",
    "clove", "cloves", "piece", "pieces", "sprig", "sprigs", "leaf", "leaves",
  ]);

  const lines = ingredientText.split("\n").filter((l) => l.trim());
  const tags = new Set<string>();

  for (const line of lines) {
    // Remove quantities (numbers, fractions, ranges)
    let cleaned = line
      .replace(/[\d½¼¾⅓⅔⅛]+[\s/-]*/g, "")
      .replace(/\(.*?\)/g, "")
      .replace(/,.*$/, "")
      .trim()
      .toLowerCase();

    const words = cleaned.split(/\s+/);
    const meaningful = words.filter(
      (w) => w.length > 2 && !stopWords.has(w) && !/^\d/.test(w),
    );

    if (meaningful.length > 0) {
      tags.add(meaningful.join(" "));
    }
  }

  return Array.from(tags);
}

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("Gourmet@26", 10);
  await prisma.user.upsert({
    where: { email: "admin@disagreeables.com" },
    update: {},
    create: {
      email: "admin@disagreeables.com",
      password: hashedPassword,
      name: "Admin",
      isAdmin: true,
    },
  });
  console.log("Admin user created: admin@disagreeables.com");

  // Import recipes from JSON
  const dataPath = join(__dirname, "data", "recipes.json");
  let recipes: Array<{
    title: string;
    shortDescription?: string;
    category?: string;
    ingredients: string;
    method: string;
    comments?: string;
    sourceUrl?: string;
    image?: { src: string };
  }>;

  try {
    const raw = readFileSync(dataPath, "utf-8");
    recipes = JSON.parse(raw);
  } catch {
    console.log("No recipes.json found, skipping recipe import");
    return;
  }

  for (const recipe of recipes) {
    const ingredientTags = extractIngredientTags(recipe.ingredients);
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        shortDescription: recipe.shortDescription || null,
        category: recipe.category || "main",
        ingredients: recipe.ingredients,
        ingredientTags,
        method: recipe.method,
        comments: recipe.comments || null,
        sourceUrl: recipe.sourceUrl || null,
        image: recipe.image || undefined,
        isVisible: true,
      },
    });
    console.log(`Imported: ${recipe.title}`);
  }

  console.log(`Seeded ${recipes.length} recipes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
