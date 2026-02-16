"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = {
  total: number;
  starters: number;
  sides: number;
  mains: number;
  desserts: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    starters: 0,
    sides: 0,
    mains: 0,
    desserts: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Total Recipes", value: stats.total, color: "text-primary" },
    { label: "Starters", value: stats.starters, color: "text-amber-600" },
    { label: "Sides", value: stats.sides, color: "text-green-600" },
    { label: "Mains", value: stats.mains, color: "text-primary" },
    { label: "Desserts", value: stats.desserts, color: "text-purple-600" },
  ];

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-bold text-black">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-card border border-gray-200 bg-white p-6 shadow-card"
          >
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-body-color">
              {card.label}
            </h3>
            <p className={`font-serif text-3xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/admin/recipes"
          className="text-sm text-primary hover:underline"
        >
          Manage recipes &rarr;
        </Link>
      </div>
    </div>
  );
}
