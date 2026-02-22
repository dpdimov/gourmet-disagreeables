import { Suspense } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import RecipeRiff from "@/components/RecipeRiff";

export const metadata = {
  title: "Recipe Riff | Gourmet Disagreeables",
};

export default function RiffPage() {
  return (
    <>
      <Breadcrumb
        pageName="Recipe Riff"
        description="Pick a recipe and choose which dimensions to vary. Keep the spirit of the dish."
      />
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <Suspense>
              <RecipeRiff />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
