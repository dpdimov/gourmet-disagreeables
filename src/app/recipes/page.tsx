import Breadcrumb from "@/components/Common/Breadcrumb";
import AllRecipes from "@/components/Recipe/AllRecipes";

export const metadata = {
  title: "Recipes | Gourmet Disagreeables",
};

export default function RecipesPage() {
  return (
    <>
      <Breadcrumb
        pageName="Recipes"
        description="Browse the full collection. Search by ingredient or filter by course."
      />
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <AllRecipes showSearch />
        </div>
      </section>
    </>
  );
}
