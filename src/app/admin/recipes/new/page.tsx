import RecipeForm from "@/components/Admin/RecipeForm";

export default function NewRecipePage() {
  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-bold text-black">
        New Recipe
      </h1>
      <RecipeForm />
    </div>
  );
}
