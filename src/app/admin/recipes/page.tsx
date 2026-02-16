"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Recipe } from "@/types/recipe";

const categoryColors: Record<string, string> = {
  starter: "bg-amber-50 text-amber-700",
  side: "bg-green-50 text-green-700",
  main: "bg-primary/10 text-primary",
  dessert: "bg-purple-50 text-purple-700",
};

type AdminRecipe = Recipe & { editKey?: string };

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    const res = await fetch("/api/recipes?admin=1");
    const data = await res.json();
    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-black">Recipes</h1>
        <Link
          href="/admin/recipes/new"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90"
        >
          New Recipe
        </Link>
      </div>

      {loading ? (
        <p className="text-body-color">Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="text-body-color">No recipes yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-card border border-gray-200 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Created
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Visible
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Edit Link
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4 font-medium text-black">
                    {recipe.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        categoryColors[recipe.category] || categoryColors.main
                      }`}
                    >
                      {recipe.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-color">
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        recipe.isVisible
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {recipe.isVisible ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {recipe.editKey && (
                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/recipe/${recipe.id}/edit?key=${recipe.editKey}`;
                          navigator.clipboard.writeText(url);
                          alert("Edit link copied to clipboard");
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Copy link
                      </button>
                    )}
                  </td>
                  <td className="space-x-3 px-6 py-4">
                    <Link
                      href={`/recipe/${recipe.id}`}
                      className="text-primary hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/recipes/${recipe.id}/edit`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
