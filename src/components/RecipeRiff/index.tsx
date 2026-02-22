"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Substitution = {
  dimension: string;
  original: string;
  replacement: string;
  quantity: string;
  note: string;
};

type RiffResult = {
  variationName: string;
  tagline: string;
  substitutions: Substitution[];
  adjustments: string;
  curiosity: string;
};

type RecipeOption = {
  id: number;
  title: string;
  category: string;
};

const DIMENSIONS = [
  {
    id: "protein",
    label: "Meat / Protein",
    icon: "\u{1F969}",
    hint: "e.g. beef, chicken thighs, merguez, chickpeas",
  },
  {
    id: "grain",
    label: "Grain / Starch",
    icon: "\u{1F33E}",
    hint: "e.g. freekeh, rice, orzo, lentils",
  },
  {
    id: "vegetables",
    label: "Vegetables",
    icon: "\u{1F966}",
    hint: "e.g. courgette, fennel, spinach, roasted peppers",
  },
  {
    id: "spices",
    label: "Spices & Aromatics",
    icon: "\u{1F33F}",
    hint: "e.g. cumin, ras el hanout, smoked paprika, sumac",
  },
];

export default function RecipeRiff() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState("");
  const [selected, setSelected] = useState({
    protein: true,
    grain: false,
    vegetables: false,
    spices: false,
  });
  const [constraints, setConstraints] = useState("");
  const [result, setResult] = useState<RiffResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedRecipe, setSavedRecipe] = useState<{ id: number } | null>(null);

  // Recipe picker state
  const [recipes, setRecipes] = useState<RecipeOption[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");
  const [recipeSearch, setRecipeSearch] = useState("");
  const [fetchingRecipe, setFetchingRecipe] = useState(false);

  // Load recipe list
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (res.ok) {
          const data = await res.json();
          setRecipes(data);
        }
      } catch {
        // silently fail — user can still paste
      } finally {
        setRecipesLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Handle URL param pre-selection
  useEffect(() => {
    const recipeId = searchParams.get("recipe");
    if (recipeId && !selectedRecipeId) {
      setSelectedRecipeId(recipeId);
      loadRecipe(recipeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const loadRecipe = async (id: string) => {
    setFetchingRecipe(true);
    try {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) throw new Error("Failed to load recipe");
      const data = await res.json();
      const parts = [data.title];
      if (data.ingredients) parts.push("\nIngredients:\n" + data.ingredients);
      if (data.method) parts.push("\nMethod:\n" + data.method);
      if (data.comments) parts.push("\nNotes:\n" + data.comments);
      setRecipe(parts.join("\n"));
    } catch {
      setError("Failed to load recipe");
    } finally {
      setFetchingRecipe(false);
    }
  };

  const handleRecipeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedRecipeId(id);
    if (id) {
      loadRecipe(id);
    }
  };

  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id as keyof typeof s] }));
  const anySelected = Object.values(selected).some(Boolean);

  const filteredRecipes = recipeSearch
    ? recipes.filter((r) =>
        r.title.toLowerCase().includes(recipeSearch.toLowerCase()),
      )
    : recipes;

  const generate = async () => {
    if (!recipe.trim() || !anySelected) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSavedRecipe(null);

    const axes = DIMENSIONS.filter(
      (d) => selected[d.id as keyof typeof selected],
    )
      .map((d) => d.label)
      .join(", ");

    try {
      const res = await fetch("/api/riff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe, axes, constraints }),
      });

      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.error || `API error ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const saveAsRecipe = async () => {
    if (!result) return;
    setSaving(true);
    setError(null);

    // Build comments from riff details
    const commentParts: string[] = [];
    commentParts.push(`"${result.tagline}"`);
    commentParts.push("");
    commentParts.push("Substitutions:");
    result.substitutions.forEach((s) => {
      commentParts.push(`- ${s.dimension}: ${s.original} → ${s.replacement}${s.quantity ? ` (${s.quantity})` : ""}`);
      if (s.note) commentParts.push(`  ${s.note}`);
    });
    if (result.adjustments) {
      commentParts.push("");
      commentParts.push(`Technique notes: ${result.adjustments}`);
    }
    if (result.curiosity) {
      commentParts.push("");
      commentParts.push(`Why this works: ${result.curiosity}`);
    }
    // Find original recipe title from the selected recipe
    const originalRecipe = recipes.find((r) => r.id === parseInt(selectedRecipeId));
    if (originalRecipe) {
      commentParts.push("");
      commentParts.push(`Riffed from: ${originalRecipe.title}`);
    }

    // Build ingredients: apply substitutions to original text
    let riffedIngredients = recipe;
    // Extract just ingredients section if the text has structure
    const ingredientsMatch = recipe.match(/Ingredients:\n([\s\S]*?)(\nMethod:|\nNotes:|$)/);
    if (ingredientsMatch) {
      riffedIngredients = ingredientsMatch[1].trim();
    }
    // Apply substitutions as best-effort text replacement
    result.substitutions.forEach((s) => {
      const regex = new RegExp(s.original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      riffedIngredients = riffedIngredients.replace(regex, `${s.replacement}${s.quantity ? ` (${s.quantity})` : ""}`);
    });

    // Extract method
    let riffedMethod = "";
    const methodMatch = recipe.match(/Method:\n([\s\S]*?)(\nNotes:|$)/);
    if (methodMatch) {
      riffedMethod = methodMatch[1].trim();
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: result.variationName,
          ingredients: riffedIngredients,
          method: riffedMethod || "See original recipe method.",
          comments: commentParts.join("\n"),
          category: originalRecipe?.category || "main",
          riffedFromId: selectedRecipeId || null,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.error || "Failed to save recipe");
      }

      const data = await res.json();
      setSavedRecipe({ id: data.id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save recipe");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <div>
      {/* Recipe Source */}
      <div className="mb-6 rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-3 font-serif text-lg font-bold text-black">
          The Recipe
        </h3>

        {/* Pick from collection */}
        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-body-color">
            Pick from the collection
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              placeholder="Search recipes..."
              className={`${inputClass} max-w-[200px]`}
            />
            <select
              value={selectedRecipeId}
              onChange={handleRecipeSelect}
              disabled={recipesLoading || fetchingRecipe}
              className={`${inputClass} flex-1`}
            >
              <option value="">
                {recipesLoading
                  ? "Loading recipes..."
                  : "Choose a recipe..."}
              </option>
              {filteredRecipes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Paste your own */}
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-body-color">
          Or paste your own
        </label>
        <textarea
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          rows={10}
          className={inputClass}
          placeholder="Paste your recipe here..."
          style={{ resize: "vertical" }}
        />
        {fetchingRecipe && (
          <p className="mt-1 text-sm text-primary">Loading recipe...</p>
        )}
      </div>

      {/* Dimensions */}
      <div className="mb-6 rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-3 font-serif text-lg font-bold text-black">
          What to Vary
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DIMENSIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => toggle(d.id)}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${
                selected[d.id as keyof typeof selected]
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 bg-gray-50 hover:border-primary/50"
              }`}
            >
              <span className="mt-0.5 text-lg">{d.icon}</span>
              <div>
                <div className="text-sm font-semibold text-black">
                  {d.label}
                </div>
                <div className="text-xs text-body-color">{d.hint}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div className="mb-6 rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-1 font-serif text-lg font-bold text-black">
          Any Constraints or Direction?
        </h3>
        <p className="mb-3 text-xs text-body-color">Optional</p>
        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="e.g. keep it Middle Eastern in feel, avoid pork, go vegetarian, try something North African..."
          style={{ resize: "none" }}
        />
      </div>

      {/* Generate button */}
      <button
        type="button"
        disabled={!recipe.trim() || !anySelected || loading}
        onClick={generate}
        className="w-full rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate Variation"}
      </button>

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-body-color">
            Composing variation...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="mb-1 font-serif text-2xl font-bold text-black sm:text-3xl">
            {result.variationName}
          </h2>
          <p className="mb-6 font-serif italic text-body-color">
            {result.tagline}
          </p>

          {/* Substitutions */}
          <div className="mb-6">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-body-color">
              Substitutions
            </h4>
            <div className="space-y-0 divide-y divide-dashed divide-gray-200">
              {result.substitutions.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_24px_1fr] items-start gap-3 py-4"
                >
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                      {s.dimension}
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      {s.original}
                    </div>
                  </div>
                  <div className="pt-3 text-center text-sm text-gray-300">
                    &rarr;
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-black">
                      {s.replacement}
                    </div>
                    {s.quantity && (
                      <div className="text-xs text-primary">{s.quantity}</div>
                    )}
                    <div className="text-xs italic text-body-color">
                      {s.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adjustments */}
          {result.adjustments && (
            <div className="mb-4 rounded-lg border-l-[3px] border-primary bg-primary/5 p-5">
              <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
                Technique Notes
              </h4>
              <p className="text-sm leading-relaxed text-black/80">
                {result.adjustments}
              </p>
            </div>
          )}

          {/* Curiosity */}
          {result.curiosity && (
            <div className="mb-4 rounded-lg border-l-[3px] border-green-600 bg-green-50 p-5">
              <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-green-700">
                Why This Works
              </h4>
              <p className="text-sm leading-relaxed text-black/80">
                {result.curiosity}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-body-color transition hover:border-primary hover:text-primary disabled:opacity-50"
            >
              Generate Another Variation
            </button>
            {!savedRecipe && (
              <button
                type="button"
                onClick={saveAsRecipe}
                disabled={saving}
                className="flex-1 rounded-lg bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save as New Recipe"}
              </button>
            )}
          </div>

          {/* Save success */}
          {savedRecipe && (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
              Recipe saved!{" "}
              <a
                href={`/recipes/${savedRecipe.id}`}
                className="font-semibold text-green-700 underline hover:text-green-900"
              >
                View it here
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
