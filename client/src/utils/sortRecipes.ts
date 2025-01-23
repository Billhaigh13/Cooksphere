import { Recipe } from "../types/types";

export function sortRecipes(recipes: Recipe[], sorting: string): Recipe[] {
  if (sorting === "A-Z") {
    return [...recipes].sort((a, b) => (a.name > b.name ? 1 : -1));
  } else if (sorting === "Z-A") {
    return [...recipes].sort((a, b) => (a.name < b.name ? 1 : -1));
  } else if (sorting.includes("Best")) {
    return [...recipes].sort((a, b) => (a.rating < b.rating ? 1 : -1));
  } else if (sorting.includes("Worst")) {
    return [...recipes].sort((a, b) => (a.rating > b.rating ? 1 : -1));
  }
  return recipes;
}
