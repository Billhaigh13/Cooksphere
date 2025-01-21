import { Category, Recipe, User } from "./types/types";

const BASE_URL = "http://localhost:3000";

async function makeServerRequest(
  endpoint: string,
  options?: object
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return await response.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`API Error: ${errorMessage}`);
  }
}

const getRecipes = async (category: string): Promise<any> => {
  try {
    return await makeServerRequest(`recipes/category/${category}`);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const getRecipe = async (recipeId: string): Promise<any> => {
  try {
    return await makeServerRequest(`recipes/${recipeId}`);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const getCategories = async (): Promise<any> => {
  try {
    return await makeServerRequest("categories");
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const getLatestRecipes = async (): Promise<any> => {
  try {
    return await makeServerRequest("recipes/latest");
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const uploadRecipe = async (recipeData: Recipe): Promise<any> => {
  try {
    return await makeServerRequest("recipe", {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const uploadImage = async (formData: string): Promise<any> => {
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drm5qsq0p/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Error uploading image");
    }
    return await response.json();
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    return await makeServerRequest("user/authenticate", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const updateUploaded = async (user: User, recipe: Recipe): Promise<any> => {
  try {
    return await makeServerRequest("user/uploaded", {
      method: "PUT",
      body: JSON.stringify({ user, recipe }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const updateFavorites = async (
  user: User,
  recipe: Recipe,
  favorite: boolean
): Promise<any> => {
  try {
    return await makeServerRequest("user/favorites", {
      method: "PUT",
      body: JSON.stringify({ user, recipe, favorite }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const searchRecipes = async (searchinput: string): Promise<any> => {
  try {
    return await makeServerRequest(`recipes?q=${searchinput}`);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

const rateAndReview = async (
  recipeId: string,
  reviewObj: Object
): Promise<any> => {
  try {
    return await makeServerRequest(`recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify(reviewObj),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};

export {
  getRecipes,
  getRecipe,
  getCategories,
  getLatestRecipes,
  uploadRecipe,
  uploadImage,
  login,
  updateUploaded,
  updateFavorites,
  searchRecipes,
  rateAndReview,
};
