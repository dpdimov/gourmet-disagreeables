export type Recipe = {
  id: number;
  title: string;
  shortDescription: string | null;
  category: string;
  ingredients: string;
  ingredientTags: string[];
  method: string;
  comments: string | null;
  image: { src: string } | null;
  sourceUrl: string | null;
  editKey: string | null;
  isVisible: boolean;
  createdAt: string;
  createdBy: {
    name: string;
  } | null;
};
