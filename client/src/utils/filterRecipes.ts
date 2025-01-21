import { Filter, Recipe } from "../types/types";

export function filterRecipes(recipes: Recipe[], filter: Filter) {
  let filteredRecipes;
  // ratings
  const ratings = filter.ratings;
  if (ratings === "all") {
    filteredRecipes = recipes;
  } else {
    filteredRecipes = recipes.filter(
      (recipe) => recipe.rating >= parseInt(ratings)
    );
  }

  // tags
  const tags = filter.tags;
  if (tags.length > 0) {
    filteredRecipes = filteredRecipes.filter((filteredRecipe) => {
      for (const tag of filteredRecipe.tags) {
        if (tags.includes(tag)) {
          return true;
        }
      }
      return false;
    });
  }

  // duration
  const duration = filter.time;
  if (duration.length > 0) {
    let quickRecipes: Recipe[] = [];
    let moderateRecipes: Recipe[] = [];
    let intensiveRecipes: Recipe[] = [];
    if (duration.includes("quick")) {
      quickRecipes = filteredRecipes.filter(
        (filteredRecipe) => filteredRecipe.cookingTimeInMinutes < 30
      );
    }
    if (duration.includes("moderate")) {
      moderateRecipes = filteredRecipes.filter(
        (filteredRecipe) =>
          filteredRecipe.cookingTimeInMinutes >= 30 &&
          filteredRecipe.cookingTimeInMinutes <= 60
      );
    }
    if (duration.includes("intensive")) {
      intensiveRecipes = filteredRecipes.filter(
        (filteredRecipe) => filteredRecipe.cookingTimeInMinutes > 60
      );
    }
    filteredRecipes = [
      ...quickRecipes,
      ...moderateRecipes,
      ...intensiveRecipes,
    ];
  }
  return filteredRecipes;
}

//TODO: TEST add unit test for this function
