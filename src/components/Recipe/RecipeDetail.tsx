"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { formatDate } from "@/lib/format-date";
import Image from "next/image";

const categoryColors: Record<string, string> = {
  starter: "bg-amber-50 text-amber-700",
  side: "bg-green-50 text-green-700",
  main: "bg-primary/10 text-primary",
  dessert: "bg-purple-50 text-purple-700",
};

const RecipeDetailPage = ({ recipe_id }: { recipe_id: string }) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipe_id) {
        window.location.href = "/";
        return;
      }
      try {
        const response = await fetch(`/api/recipes/${recipe_id}`);
        if (!response.ok) {
          window.location.href = "/";
          return;
        }
        const data = await response.json();
        setRecipe(data);
      } catch {
        window.location.href = "/";
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe_id]);

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {isLoading ? (
            <div className="loader-container">
              <div className="loader">
                <div>
                  <ul>
                    {[...Array(6)].map((_, i) => (
                      <li key={i}>
                        <svg fill="currentColor" viewBox="0 0 90 120">
                          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
                <span>Loading</span>
              </div>
            </div>
          ) : (
            recipe && (
              <div className="w-full px-4 lg:w-8/12">
                <div className="rounded-card border border-gray-200 bg-white p-8 shadow-card sm:p-12">
                  <div className="mb-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        categoryColors[recipe.category] || categoryColors.main
                      }`}
                    >
                      {recipe.category}
                    </span>
                  </div>
                  <h2 className="mb-4 font-serif text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight">
                    {recipe.title}
                  </h2>
                  {recipe.shortDescription && (
                    <p className="mb-6 text-lg text-body-color">
                      {recipe.shortDescription}
                    </p>
                  )}
                  <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-4 text-sm text-body-color">
                    {recipe.createdBy?.name && (
                      <span>
                        By{" "}
                        <span className="font-medium text-black">
                          {recipe.createdBy.name}
                        </span>
                      </span>
                    )}
                    <span>{formatDate(recipe.createdAt)}</span>
                  </div>

                  {/* Image */}
                  <div className="mb-10 w-full overflow-hidden rounded-lg">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      {recipe.image?.src ? (
                        <Image
                          src={recipe.image.src}
                          alt={recipe.title}
                          fill
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50">
                          <span className="text-6xl">🍽️</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-8">
                    <h3 className="mb-4 font-serif text-xl font-bold text-black sm:text-2xl">
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {recipe.ingredients
                        .split("\n")
                        .filter((l) => l.trim())
                        .map((ingredient, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-base text-body-color"
                          >
                            <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
                            {ingredient.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Method */}
                  <div className="mb-8">
                    <h3 className="mb-4 font-serif text-xl font-bold text-black sm:text-2xl">
                      Method
                    </h3>
                    <div className="space-y-4">
                      {recipe.method
                        .split("\n")
                        .filter((l) => l.trim())
                        .map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                              {idx + 1}
                            </span>
                            <p className="text-base !leading-relaxed text-body-color">
                              {step.replace(/^\d+\.\s*/, "")}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Comments */}
                  {recipe.comments && (
                    <div className="mb-8">
                      <h3 className="mb-4 font-serif text-xl font-bold text-black sm:text-2xl">
                        Notes
                      </h3>
                      <div className="rounded-lg bg-primary/5 p-4">
                        <p className="text-base !leading-relaxed text-body-color">
                          {recipe.comments}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Source URL */}
                  {recipe.sourceUrl && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-body-color">
                        Source:{" "}
                        <a
                          href={recipe.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {recipe.sourceUrl}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeDetailPage;
