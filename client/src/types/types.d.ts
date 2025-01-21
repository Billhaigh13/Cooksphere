export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface Ingredient {
  ingredient: string;
  measure: string;
}

export interface Review {
  author: string;
  message: string;
  rating: number;
  timestamp: string;
}

export interface Recipe {
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
}

export interface FormState {
  name: string;
  category: string;
  instructions: Record<string, string>;
  ingredients: Record<string, string>;
  imageFile: File | null;
  imageUrl: string;
  tags: Record<string, string>;
  cookingTime: {
    hours: string;
    minutes: string;
  };
}

export interface User {
  firstname: string;
  lastname: string;
  image: string;
  email: string;
  password: string;
  favoriteRecipes: Recipe[];
  uploadedRecipes: Recipe[];
}

export interface FilterState {
  tags: string[];
  time: string[];
  ratings: string | number;
}
