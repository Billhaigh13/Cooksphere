import request from "supertest";
import mongoose from "mongoose";
import express from "express";
import router from "../routers/router";
import User from "../models/user";
import Recipe from "../models/recipe";
import Category from "../models/category";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(router);

beforeAll(async () => {
  const uri = "mongodb://127.0.0.1:27017/test";
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Integration Tests for Backend API", () => {
  describe("Category Endpoints", () => {
    it("GET /categories should fetch all categories", async () => {
      await Category.create({ name: "Desserts", image: "desserts.jpg" });

      const res = await request(app).get("/categories");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toMatchObject({
        name: "Desserts",
        image: "desserts.jpg",
      });
    });
  });

  describe("Recipe Endpoints", () => {
    let recipeId: string;

    it("POST /recipe should create a new recipe", async () => {
      const newRecipe = {
        name: "Pasta",
        category: "Main Course",
        instructions: ["Boil water", "Add pasta"],
        image: "pasta.jpg",
        tags: ["Italian", "Dinner"],
        ingredients: [{ ingredient: "Pasta", measure: "200g" }],
        cookingTimeInMinutes: 30,
      };

      const res = await request(app).post("/recipes").send(newRecipe);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(newRecipe);
      recipeId = res.body._id;
    });

    it("GET /recipes should fetch all recipes", async () => {
      const res = await request(app).get("/recipes");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });

    it("GET /recipes/:recipeId should fetch a recipe by ID", async () => {
      const res = await request(app).get(`/recipes/${recipeId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Pasta");
    });

    it("POST /recipes/:recipeId should add a review to the recipe", async () => {
      const review = {
        author: "John",
        message: "Delicious!",
        rating: 5,
        timestamp: new Date(),
      };
      const res = await request(app).put(`/recipes/${recipeId}`).send(review);
      expect(res.status).toBe(200);

      const updatedRecipe = await Recipe.findById(recipeId);
      expect(updatedRecipe?.reviews).toContainEqual(
        expect.objectContaining(review)
      );
    });
  });

  describe("User Endpoints", () => {
    let userEmail = "testuser@example.com";
    let userPassword = "securepassword";

    it("POST /user/authenticate should create and authenticate a user", async () => {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      await User.create({
        firstname: "John",
        lastname: "Doe",
        email: userEmail,
        password: hashedPassword,
        image: "man",
      });

      const res = await request(app)
        .post("/user/authenticate")
        .send({ email: userEmail, password: userPassword });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email", userEmail);
    });

    it("PUT /user/favorites should update user favorite recipes", async () => {
      const recipe = await Recipe.findOne();

      const res = await request(app)
        .put("/user/favorites")
        .send({
          user: { email: userEmail },
          recipe: recipe?._id,
          favorite: true,
        });

      expect(res.status).toBe(200);
      expect(res.body.favoriteRecipes).toContainEqual(recipe?._id.toString());
    });

    it("PUT /user/uploaded should update user's uploaded recipes", async () => {
      const recipe = await Recipe.findOne();

      const res = await request(app)
        .put("/user/uploaded")
        .send({ user: { email: userEmail }, recipe: recipe?._id });

      expect(res.status).toBe(200);
      expect(res.body.uploadedRecipes).toContainEqual(recipe?._id.toString());
    });
  });
});
