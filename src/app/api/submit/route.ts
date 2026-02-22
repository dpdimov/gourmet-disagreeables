import { prisma } from "@/lib/prisma";
import { extractIngredientTags } from "@/lib/extract-ingredients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!body.ingredients?.trim()) {
    return NextResponse.json({ error: "Ingredients are required" }, { status: 400 });
  }

  if (!body.method?.trim()) {
    return NextResponse.json({ error: "Method is required" }, { status: 400 });
  }

  const ingredientTags = extractIngredientTags(body.ingredients);

  const recipe = await prisma.recipe.create({
    data: {
      title: body.title,
      shortDescription: body.shortDescription || null,
      category: body.category || "main",
      ingredients: body.ingredients,
      ingredientTags,
      method: body.method,
      comments: body.comments || null,
      image: body.image || null,
      sourceUrl: body.sourceUrl || null,
      riffedFromId: body.riffedFromId ? parseInt(body.riffedFromId) : null,
      isVisible: true,
    },
  });

  return NextResponse.json(
    { id: recipe.id, editKey: recipe.editKey },
    { status: 201 },
  );
}
