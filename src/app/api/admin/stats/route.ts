import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [total, starters, sides, mains, desserts] = await Promise.all([
    prisma.recipe.count(),
    prisma.recipe.count({ where: { category: "starter" } }),
    prisma.recipe.count({ where: { category: "side" } }),
    prisma.recipe.count({ where: { category: "main" } }),
    prisma.recipe.count({ where: { category: "dessert" } }),
  ]);

  return NextResponse.json({ total, starters, sides, mains, desserts });
}
