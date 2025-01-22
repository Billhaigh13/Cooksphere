"use strict";
import Recipe from "../models/recipe";
import { Request, Response } from "express";

const getRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (Object.keys(!req.query).length === 0) {
      const recipes = await Recipe.find();
      res.send(recipes);
    } else {
      const searchQuery = req.query.q as string;
      const recipes = await Recipe.find({ $text: { $search: searchQuery } });
      res.send(recipes);
    }
  } catch (e) {
    console.log("Req query: ", req.query);
    console.log(e);

    res
      .status(500)
      .send({ error: { message: "Error getting recipes!", code: 500 } });
  }
};

const getRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.recipeId;
    if (!id) {
      res
        .status(400)
        .send({ error: { message: "No recipe id provided!", code: 400 } });
    }
    const recipe = await Recipe.findOne({ _id: id });
    res.send(recipe);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: { message: "Error getting recipe!", code: 500 } });
  }
};

const getRecipesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = req.params.category;
    if (!category) {
      res
        .status(400)
        .send({ error: { message: "No category provided!", code: 400 } });
    }
    const recipes = await Recipe.find({ category });
    res.send(recipes);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: { message: "Error getting recipes!", code: 500 } });
  }
};

const getLastAddedRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(10);
    res.send(recipes);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: { message: "Error getting recipes!", code: 500 } });
  }
};

const postRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    if (!body) {
      res
        .status(400)
        .send({ error: { message: "Request body missing!", code: 400 } });
    }
    const recipe = await Recipe.create(body);
    res.status(201).send(recipe);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: { message: "Error creating recipe!", code: 500 } });
  }
};

const postReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating, message } = req.body;
    if (!rating && !message) {
      res
        .status(400)
        .send({ error: { message: "Missing rating or review!", code: 400 } });
    }
    const id = req.params.recipeId;
    if (!id) {
      res
        .status(400)
        .send({ error: { message: "No recipe id provided!", code: 400 } });
    }
    const recipe = await Recipe.findOne({ _id: id });
    if (!recipe) {
      res
        .status(404)
        .send({ error: { message: "Recipe not found!", code: 404 } });
    }
    if (recipe) {
      const oldRating = recipe.rating;

      recipe.reviews.push(req.body);
      const newRating = parseFloat(
        ((oldRating + rating) / recipe.reviews.length).toFixed(2)
      );
      recipe.rating = newRating;
      await recipe.save();
      res.status(200).send(req.body);
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: { message: "Error creating recipe!", code: 500 } });
  }
};

export {
  getRecipes,
  getRecipe,
  getRecipesByCategory,
  getLastAddedRecipes,
  postRecipe,
  postReview,
};
