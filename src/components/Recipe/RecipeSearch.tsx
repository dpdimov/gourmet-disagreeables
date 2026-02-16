"use client";

import { useState, useEffect, useRef } from "react";

const categories = [
  { key: "all", label: "All" },
  { key: "starter", label: "Starters" },
  { key: "side", label: "Sides" },
  { key: "main", label: "Mains" },
  { key: "dessert", label: "Desserts" },
];

export default function RecipeSearch({
  onSearch,
  onCategoryChange,
}: {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timeoutRef.current);
  }, [query, onSearch]);

  const handleCategoryClick = (key: string) => {
    setActiveCategory(key);
    onCategoryChange(key);
  };

  return (
    <div className="mb-10">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by recipe name or ingredient..."
            className="w-full rounded-lg border border-gray-200 bg-white px-5 py-3 pl-12 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-body-color"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === key
                ? "bg-primary text-white"
                : "bg-white text-body-color border border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
