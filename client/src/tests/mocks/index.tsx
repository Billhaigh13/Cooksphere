import { categories } from "./categories";
import { recipes } from "./recipes";
import { currentUser } from "./user";
import { userWithFavorite } from "./userWithFavorite";


export const mocks = {
  currentUser,
  userWithFavorite,
  recipes,
  recipe: recipes[0],
  categories,
  category: categories[0]
}