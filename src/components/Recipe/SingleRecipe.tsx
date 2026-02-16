import { Recipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  starter: "bg-amber-50 text-amber-700",
  side: "bg-green-50 text-green-700",
  main: "bg-primary/10 text-primary",
  dessert: "bg-purple-50 text-purple-700",
};

const SingleRecipe = ({ recipe }: { recipe: Recipe }) => {
  const { id, title, image, shortDescription, category } = recipe;
  return (
    <div className="group relative mt-3 overflow-hidden rounded-card border border-gray-200 bg-white shadow-card transition duration-300 hover:shadow-card-hover">
      <Link
        href={`/recipe/${id}`}
        className="relative block aspect-[37/22] w-full"
      >
        {image?.src ? (
          <Image src={image.src} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <div className="mb-3">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
              categoryColors[category] || categoryColors.main
            }`}
          >
            {category}
          </span>
        </div>
        <h3>
          <Link
            href={`/recipe/${id}`}
            className="mb-4 block font-serif text-xl font-bold text-black hover:text-primary sm:text-2xl"
          >
            {title}
          </Link>
        </h3>
        {shortDescription && (
          <p className="line-clamp-2 text-base font-light text-body-color">
            {shortDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;
