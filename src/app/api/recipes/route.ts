import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const admin = searchParams.get("admin");

  const session = admin ? await getServerSession(authOptions) : null;
  const isAdmin = !!session?.user?.isAdmin;

  const where: Prisma.RecipeWhereInput = isAdmin ? {} : { isVisible: true };

  if (category && category !== "all") {
    where.category = category;
  }

  if (search) {
    const searchLower = search.toLowerCase();
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
      { ingredientTags: { has: searchLower } },
      { ingredients: { contains: search, mode: "insensitive" } },
    ];
  }

  const recipes = await prisma.recipe.findMany({
    where,
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: parseInt(limit) } : {}),
    select: {
      id: true,
      title: true,
      shortDescription: true,
      category: true,
      image: true,
      ingredientTags: true,
      createdAt: true,
      isVisible: true,
      ...(isAdmin ? { editKey: true } : {}),
      createdBy: { select: { name: true } },
    },
  });

  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const { extractIngredientTags } = await import("@/lib/extract-ingredients");
  const ingredientTags = extractIngredientTags(body.ingredients || "");

  const recipe = await prisma.recipe.create({
    data: {
      title: body.title,
      shortDescription: body.shortDescription,
      category: body.category || "main",
      ingredients: body.ingredients || "",
      ingredientTags,
      method: body.method || "",
      comments: body.comments,
      image: body.image,
      sourceUrl: body.sourceUrl,
      isVisible: body.isVisible ?? true,
      createdById: session.user.id,
    },
    include: { createdBy: { select: { name: true } } },
  });

  return NextResponse.json(recipe, { status: 201 });
}
