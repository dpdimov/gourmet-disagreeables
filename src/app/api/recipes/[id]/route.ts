import { prisma } from "@/lib/prisma";
import { extractIngredientTags } from "@/lib/extract-ingredients";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      createdBy: { select: { name: true } },
      riffedFrom: { select: { id: true, title: true } },
    },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!recipe.isVisible) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  return NextResponse.json(recipe);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const editKey = searchParams.get("editKey");
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.isAdmin;

  if (!isAdmin) {
    if (!editKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const existing = await prisma.recipe.findUnique({ where: { id } });
    if (!existing || existing.editKey !== editKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const body = await request.json();
  const ingredientTags = body.ingredients
    ? extractIngredientTags(body.ingredients)
    : undefined;

  const recipe = await prisma.recipe.update({
    where: { id },
    data: {
      title: body.title,
      shortDescription: body.shortDescription,
      category: body.category,
      ingredients: body.ingredients,
      ...(ingredientTags ? { ingredientTags } : {}),
      method: body.method,
      comments: body.comments,
      image: body.image,
      sourceUrl: body.sourceUrl,
      ...(isAdmin ? { isVisible: body.isVisible } : {}),
    },
    include: { createdBy: { select: { name: true } } },
  });

  return NextResponse.json(recipe);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.recipe.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
