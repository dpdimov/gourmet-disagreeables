"use client";

import { useEffect, useState } from "react";
import RecipeForm from "@/components/Admin/RecipeForm";

export default function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const [recipe, setRecipe] = useState<null | Record<string, unknown>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <p className="text-body-color">Loading...</p>;
  }

  if (!recipe) {
    return <p className="text-body-color">Recipe not found.</p>;
  }

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-bold text-black">
        Edit Recipe
      </h1>
      <RecipeForm
        initialData={{
          id: recipe.id as number,
          title: (recipe.title as string) || "",
          shortDescription: (recipe.shortDescription as string) || "",
          category: (recipe.category as string) || "main",
          ingredients: (recipe.ingredients as string) || "",
          method: (recipe.method as string) || "",
          comments: (recipe.comments as string) || "",
          image: recipe.image as { src: string } | null,
          sourceUrl: (recipe.sourceUrl as string) || "",
          isVisible: (recipe.isVisible as boolean) ?? true,
          editKey: (recipe.editKey as string) || null,
        }}
      />
    </div>
  );
}
