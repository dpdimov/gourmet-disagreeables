import Breadcrumb from "@/components/Common/Breadcrumb";
import EditRecipe from "./EditRecipe";

export const metadata = {
  title: "Edit Recipe | Gourmet Disagreeables",
};

export default function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Breadcrumb
        pageName="Edit Recipe"
        description="Update your recipe details."
      />
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <EditRecipe recipeId={params.id} />
          </div>
        </div>
      </section>
    </>
  );
}
