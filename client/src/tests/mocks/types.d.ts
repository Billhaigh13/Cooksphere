export type Recipe = {
  _id: string;
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

export type Ingredient = {
  ingredient: string;
  measure: string;
  _id: string;
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

export type Review = {
  author: string;
  message: string;
  rating: number;
  timestamp: string;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
};
