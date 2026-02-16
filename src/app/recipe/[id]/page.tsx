import RecipeDetailPage from "@/components/Recipe/RecipeDetail";

export default function RecipeDetail({ params }: { params: { id: string } }) {
  return <RecipeDetailPage recipe_id={params.id} />;
}
