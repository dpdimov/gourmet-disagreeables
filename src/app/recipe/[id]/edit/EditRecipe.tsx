"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { resizeImage } from "@/lib/resize-image";

const categories = ["starter", "side", "main", "dessert"];

export default function EditRecipe({ recipeId }: { recipeId: string }) {
  const searchParams = useSearchParams();
  const editKey = searchParams.get("key");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/recipes/${recipeId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setRecipe)
      .catch(() => {
        window.location.href = "/";
      })
      .finally(() => setLoading(false));
  }, [recipeId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !recipe) return;
    setUploading(true);
    try {
      const resized = await resizeImage(file);
      const formData = new FormData();
      formData.append("file", resized);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await res.json();
      setRecipe({ ...recipe, image: { src: url } });
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(
        `/api/recipes/${recipeId}?editKey=${editKey}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
        },
      );
      if (!res.ok) throw new Error("Failed to save");
      setSuccess(true);
    } catch {
      setError("Failed to save recipe. Check your edit link.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-body-color">Loading...</div>
    );
  }

  if (!recipe) return null;

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  if (success) {
    return (
      <div className="rounded-card border border-gray-200 bg-white p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-3 font-serif text-2xl font-bold text-black">
          Recipe Updated
        </h2>
        <p className="mb-6 text-body-color">
          Your changes have been saved.
        </p>
        <a
          href={`/recipe/${recipeId}`}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          View Recipe
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Recipe Title *
          </label>
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Short Description
          </label>
          <input
            type="text"
            value={recipe.shortDescription || ""}
            onChange={(e) =>
              setRecipe({ ...recipe, shortDescription: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Category
          </label>
          <select
            value={recipe.category}
            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Ingredients *
          </label>
          <p className="mb-2 text-xs text-body-color">
            One ingredient per line, including quantities.
          </p>
          <textarea
            value={recipe.ingredients}
            onChange={(e) =>
              setRecipe({ ...recipe, ingredients: e.target.value })
            }
            rows={8}
            className={inputClass}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Method *
          </label>
          <p className="mb-2 text-xs text-body-color">
            Numbered steps, one per line.
          </p>
          <textarea
            value={recipe.method}
            onChange={(e) => setRecipe({ ...recipe, method: e.target.value })}
            rows={10}
            className={inputClass}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Notes / Comments
          </label>
          <textarea
            value={recipe.comments || ""}
            onChange={(e) => setRecipe({ ...recipe, comments: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Source URL
          </label>
          <input
            type="url"
            value={recipe.sourceUrl || ""}
            onChange={(e) =>
              setRecipe({ ...recipe, sourceUrl: e.target.value })
            }
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Recipe Image
          </label>
          {recipe.image?.src && (
            <div className="mb-3">
              <img
                src={recipe.image.src}
                alt="preview"
                className="h-32 rounded-lg object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="text-sm text-body-color"
          />
          {uploading && (
            <p className="mt-1 text-sm text-primary">Uploading...</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
