"use client";

import { useState, useEffect, useCallback } from "react";
import RecipePlaceholder from "./RecipePlaceholder";
import SingleRecipe from "./SingleRecipe";
import RecipeSearch from "./RecipeSearch";
import { Recipe } from "@/types/recipe";

const AllRecipes = ({
  showSearch = false,
  limit,
}: {
  showSearch?: boolean;
  limit?: number;
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (limit) params.set("limit", String(limit));
      if (search) params.set("search", search);
      if (category && category !== "all") params.set("category", category);

      const response = await fetch(`/api/recipes?${params}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [limit, search, category]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div>
      {showSearch && (
        <RecipeSearch onSearch={setSearch} onCategoryChange={setCategory} />
      )}
      <div className="-mx-4 flex flex-wrap">
        {isLoading ? (
          <>
            <RecipePlaceholder />
            <RecipePlaceholder />
            <RecipePlaceholder />
          </>
        ) : recipes.length === 0 ? (
          <div className="w-full px-4 py-12 text-center">
            <p className="text-lg text-body-color">
              {search || category !== "all"
                ? "No recipes match your search. Try different keywords or filters."
                : "No recipes yet. Be the first to submit one!"}
            </p>
          </div>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <SingleRecipe recipe={recipe} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
