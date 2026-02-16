const STOP_WORDS = new Set([
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

export function extractIngredientTags(ingredientText: string): string[] {
  const lines = ingredientText.split("\n").filter((l) => l.trim());
  const tags = new Set<string>();

  for (const line of lines) {
    const cleaned = line
      .replace(/[\d½¼¾⅓⅔⅛]+[\s/-]*/g, "")
      .replace(/\(.*?\)/g, "")
      .replace(/,.*$/, "")
      .trim()
      .toLowerCase();

    const words = cleaned.split(/\s+/);
    const meaningful = words.filter(
      (w) => w.length > 2 && !STOP_WORDS.has(w) && !/^\d/.test(w),
    );

    if (meaningful.length > 0) {
      tags.add(meaningful.join(" "));
    }
  }

  return Array.from(tags);
}
