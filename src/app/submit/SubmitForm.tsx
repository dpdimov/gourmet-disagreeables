"use client";

import { useState } from "react";
import { resizeImage } from "@/lib/resize-image";

const categories = ["starter", "side", "main", "dessert"];

type FormData = {
  title: string;
  shortDescription: string;
  category: string;
  ingredients: string;
  method: string;
  comments: string;
  sourceUrl: string;
};

export default function SubmitForm() {
  const [data, setData] = useState<FormData>({
    title: "",
    shortDescription: "",
    category: "main",
    ingredients: "",
    method: "",
    comments: "",
    sourceUrl: "",
  });
  const [image, setImage] = useState<{ src: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    id: number;
    editKey: string;
  } | null>(null);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const resized = await resizeImage(file);
      const formData = new FormData();
      formData.append("file", resized);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await res.json();
      setImage({ src: url });
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setImporting(true);
    setError("");
    try {
      const res = await fetch("/api/import-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Import failed");
      }
      const recipe = await res.json();
      setData({
        title: recipe.title || "",
        shortDescription: recipe.shortDescription || "",
        category: recipe.category || "main",
        ingredients: recipe.ingredients || "",
        method: recipe.method || "",
        comments: recipe.comments || "",
        sourceUrl: importUrl,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to import recipe",
      );
    } finally {
      setImporting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!data.ingredients.trim()) {
      setError("Ingredients are required");
      return;
    }
    if (!data.method.trim()) {
      setError("Method is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const json = await res.json();
      setResult(json);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (result) {
    const editUrl = `${window.location.origin}/recipe/${result.id}/edit?key=${result.editKey}`;
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
          Recipe Submitted
        </h2>
        <p className="mb-6 text-body-color">
          Your recipe has been added to the collection. Save the link below to
          edit it anytime.
        </p>
        <div className="mx-auto max-w-[500px] rounded-lg bg-primary/5 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-body-color">
            Your Edit Link
          </p>
          <code className="block break-all text-sm text-primary">
            {editUrl}
          </code>
          <button
            onClick={() => navigator.clipboard.writeText(editUrl)}
            className="mt-3 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Copy Link
          </button>
        </div>
        <p className="mt-6 text-xs text-body-color">
          Bookmark this link &mdash; it&apos;s the only way to edit your
          submission.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Import from URL */}
      <div className="mb-6 rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-3 font-serif text-lg font-bold text-black">
          Import from URL
        </h3>
        <p className="mb-4 text-sm text-body-color">
          Paste a recipe URL and we&apos;ll extract the details automatically.
        </p>
        <div className="flex gap-3">
          <input
            type="url"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            placeholder="https://www.bbcgoodfood.com/recipes/..."
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={handleImport}
            disabled={importing || !importUrl}
            className="shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-70"
          >
            {importing ? "Importing..." : "Import"}
          </button>
        </div>
      </div>

      <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        {/* Title */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Recipe Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            className={inputClass}
            placeholder="e.g. Slow-Roasted Lamb Shoulder"
            required
          />
        </div>

        {/* Short description */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-black">
            Short Description
          </label>
          <p className="mb-2 text-xs text-body-color">
            A one-liner summarising the dish.
          </p>
          <input
            type="text"
            value={data.shortDescription}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                shortDescription: e.target.value,
              }))
            }
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Category
          </label>
          <select
            value={data.category}
            onChange={(e) =>
              setData((prev) => ({ ...prev, category: e.target.value }))
            }
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-black">
            Ingredients *
          </label>
          <p className="mb-2 text-xs text-body-color">
            One ingredient per line, including quantities.
          </p>
          <textarea
            value={data.ingredients}
            onChange={(e) =>
              setData((prev) => ({ ...prev, ingredients: e.target.value }))
            }
            rows={8}
            className={inputClass}
            placeholder="500g beef mince&#10;1 onion, diced&#10;2 cloves garlic, minced"
            required
          />
        </div>

        {/* Method */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-black">
            Method *
          </label>
          <p className="mb-2 text-xs text-body-color">
            Numbered steps, one per line.
          </p>
          <textarea
            value={data.method}
            onChange={(e) =>
              setData((prev) => ({ ...prev, method: e.target.value }))
            }
            rows={10}
            className={inputClass}
            placeholder="1. Preheat oven to 180C.&#10;2. Heat oil in a large pan..."
            required
          />
        </div>

        {/* Comments */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-black">
            Notes / Comments
          </label>
          <p className="mb-2 text-xs text-body-color">
            Tips, serving suggestions, or variations.
          </p>
          <textarea
            value={data.comments}
            onChange={(e) =>
              setData((prev) => ({ ...prev, comments: e.target.value }))
            }
            rows={3}
            className={inputClass}
          />
        </div>

        {/* Source URL */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Source URL
          </label>
          <input
            type="url"
            value={data.sourceUrl}
            onChange={(e) =>
              setData((prev) => ({ ...prev, sourceUrl: e.target.value }))
            }
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Recipe Image
          </label>
          {image?.src && (
            <div className="mb-3">
              <img
                src={image.src}
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
          {saving ? "Submitting..." : "Submit Recipe"}
        </button>
      </div>
    </form>
  );
}
