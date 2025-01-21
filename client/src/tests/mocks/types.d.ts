export type Recipe = {
  _id: {$oid: string};
  name: string;
  category: string;
  instructions: string[];
  image: string;
  tags: string[];
  ingredients: Ingredient[];
  cookingTimeInMinutes: number;
  rating: number;
  reviews: string[];
  __v: number;
  createdAt: {$date: string};
  updatedAt: {$date: string}; 
}

export type Ingredient = {
  ingredient: string;
  measure: string;
  _id: {$oid: string};
}

export type User = {
  firstname: string;
  lastname: string;
  image: string;
  email: string;
  password: string;
  favoriteRecipes: Recipe[];
  uploadedRecipes: Recipe[];
}