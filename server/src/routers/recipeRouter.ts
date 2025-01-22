"use strict";
import express from "express";
import {
  getRecipes,
  getRecipe,
  getRecipesByCategory,
  getLastAddedRecipes,
  postRecipe,
  postReview,
} from "../controllers/recipeController";

const recipeRouter = express.Router();

recipeRouter.get("/", getRecipes);
recipeRouter.get("/latest", getLastAddedRecipes);
recipeRouter.get("/:recipeId", getRecipe);
recipeRouter.get("/category/:category", getRecipesByCategory);
recipeRouter.post("/", postRecipe);
recipeRouter.put("/:recipeId", postReview);

export default recipeRouter;
