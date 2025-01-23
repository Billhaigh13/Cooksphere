import { Recipe } from "../types/types";

export function getTags(recipes: Recipe[]) {
  const tags = new Set();
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return tags;
}
