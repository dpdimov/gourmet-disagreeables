import SectionTitle from "../Common/SectionTitle";
import AllRecipes from "./AllRecipes";

const Recipe = () => {
  return (
    <section id="recipes" className="bg-cream pb-[120px] pt-[120px]">
      <div className="container">
        <SectionTitle
          title="Latest Recipes"
          paragraph="Recently added dishes from The Disagreeables."
          center
        />
        <AllRecipes limit={6} />
      </div>
    </section>
  );
};

export default Recipe;
