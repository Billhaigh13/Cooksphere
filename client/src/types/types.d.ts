export type Category = {
  name: string;
  image: string;
};

export type Ingredient = {
  ingredient: string;
  measure: string;
};

export type Review = {
  author: string;
  message: string;
  rating: number;
  timestamp: string;
};

export type Recipe = {
  name: string;
  category: string;
  instructions: string[];
  image: string;
  tags: string[];
  ingredients: Ingredient[];
  cookingTimeInMinutes: number;
  rating: number;
  reviews: Review[];
};

export type User = {
  firstname: string;
  lastname: string;
  image: string;
  email: string;
  password: string;
  favoriteRecipes: Recipe[];
  uploadedRecipes: Recipe[];
};
