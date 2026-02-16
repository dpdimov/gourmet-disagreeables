"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RecipeData = {
  id?: number;
  title: string;
  shortDescription: string;
  category: string;
  ingredients: string;
  method: string;
  comments: string;
  image: { src: string } | null;
  sourceUrl: string;
  isVisible: boolean;
  editKey?: string | null;
};

const defaultData: RecipeData = {
  title: "",
  shortDescription: "",
  category: "main",
  ingredients: "",
  method: "",
  comments: "",
  image: null,
  sourceUrl: "",
  isVisible: true,
};

const categories = ["starter", "side", "main", "dessert"];

export default function RecipeForm({
  initialData,
}: {
  initialData?: RecipeData;
}) {
  const [data, setData] = useState<RecipeData>(initialData || defaultData);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isEditing = !!initialData?.id;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await res.json();
      setData((prev) => ({ ...prev, image: { src: url } }));
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const url = isEditing
        ? `/api/recipes/${initialData!.id}`
        : "/api/recipes";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save recipe");

      router.push("/admin/recipes");
      router.refresh();
    } catch {
      setError("Failed to save recipe");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        {/* Title */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            className={inputClass}
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Short Description
          </label>
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
          <label className="mb-2 block text-sm font-medium text-black">
            Ingredients *
          </label>
          <textarea
            value={data.ingredients}
            onChange={(e) =>
              setData((prev) => ({ ...prev, ingredients: e.target.value }))
            }
            rows={8}
            className={inputClass}
            required
          />
        </div>

        {/* Method */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Method *
          </label>
          <textarea
            value={data.method}
            onChange={(e) =>
              setData((prev) => ({ ...prev, method: e.target.value }))
            }
            rows={10}
            className={inputClass}
            required
          />
        </div>

        {/* Comments */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Notes / Comments
          </label>
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
          {data.image?.src && (
            <div className="mb-3">
              <img
                src={data.image.src}
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

        {/* Toggles */}
        <div className="mb-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              checked={data.isVisible}
              onChange={(e) =>
                setData((prev) => ({ ...prev, isVisible: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Visible in public listing
          </label>
        </div>

        {/* Edit link info */}
        {isEditing && initialData?.editKey && (
          <div className="mb-6 rounded-lg bg-primary/5 p-4">
            <p className="mb-1 text-sm font-medium text-black">
              Edit Link (share with recipe creator):
            </p>
            <code className="break-all text-xs text-primary">
              {typeof window !== "undefined"
                ? `${window.location.origin}/recipe/${initialData.id}/edit?key=${initialData.editKey}`
                : ""}
            </code>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-70"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Recipe"
              : "Create Recipe"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-200 px-8 py-3 text-sm font-medium text-body-color transition hover:border-primary hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
