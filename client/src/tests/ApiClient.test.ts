import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  getRecipes,
  getRecipe,
  getCategories,
  getLatestRecipes,
  uploadRecipe,
  updateFavorites,
} from "./../ApiClient";
import { mocks } from "./mocks";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("API Utility Functions", () => {
  const mockResponse = (data: any, ok = true) => {
    return {
      ok,
      json: async () => data,
    };
  };

  test("getRecipes should fetch recipes by category", async () => {
    const category = mocks.category.name;
    const mockData = [mocks.recipe];

    mockFetch.mockResolvedValue(mockResponse(mockData));

    const result = await getRecipes(category);

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:3000/recipes/category/${category}`,
      undefined
    );
    expect(result).toEqual(mockData);
  });

  test("getRecipe should fetch a recipe by ID", async () => {
    const recipeId = mocks.recipe._id;
    const mockData = mocks.recipe;

    mockFetch.mockResolvedValue(mockResponse(mockData));

    const result = await getRecipe(recipeId);

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:3000/recipes/${recipeId}`,
      undefined
    );
    expect(result).toEqual(mockData);
  });

  test("getCategories should fetch all categories", async () => {
    const mockData = mocks.categories;

    mockFetch.mockResolvedValue(mockResponse(mockData));

    const result = await getCategories();

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:3000/categories`,
      undefined
    );
    expect(result).toEqual(mockData);
  });

  test("uploadRecipe should post recipe data", async () => {
    const mockData = { success: true };

    mockFetch.mockResolvedValue(mockResponse(mockData));

    const result = await uploadRecipe(mocks.recipe);

    expect(mockFetch).toHaveBeenCalledWith(`http://localhost:3000/recipes`, {
      method: "POST",
      body: JSON.stringify(mocks.recipe),
      headers: { "Content-Type": "application/json" },
    });
    expect(result).toEqual(mockData);
  });

  test("getLatestRecipes should fetch the latest recipes", async () => {
    const mockData = mocks.recipes;

    mockFetch.mockResolvedValue(mockResponse(mockData));

    const result = await getLatestRecipes();

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:3000/recipes/latest`,
      undefined
    );
    expect(result).toEqual(mockData);
  });

  test("should handle fetch errors", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    await expect(getRecipes("invalid-category")).rejects.toThrow(
      "Error fetching data"
    );
  });

  test("updateFavorites should update user favorites", async () => {
    const favorite = true;
    const mockData = { success: true };
    const user = mocks.currentUser;
    const recipe = mocks.recipe;

    mockFetch.mockResolvedValue(mockResponse(mockData));

    const result = await updateFavorites(user, recipe, favorite);

    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:3000/user/favorites`,
      {
        method: "PUT",
        body: JSON.stringify({ user, recipe, favorite }),
        headers: { "Content-Type": "application/json" },
      }
    );
    expect(result).toEqual(mockData);
  });
});
