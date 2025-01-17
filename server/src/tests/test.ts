import express from "express";
import router from "../router";
import supertest from "supertest";
import mongoose from "mongoose";
import { mocks } from "./mocks/index"
// import Recipe from "../models/recipe";

const databaseName: string = "test";
// const recipeSchema = new mongoose.Schema({
//   name: {type: String, required: true},
//   category: {type: String, required: true},
//   instructions: {type: [String], required: true},
//   image: {type: String, required: true},
//   tags: {type: [String], required: true},
//   ingredients: {type: [{ingredient: String, measure: String}], required: true},
//   cookingTimeInMinutes: {type: Number, required: true},
//   rating: {type: Number, default: 0},
//   reviews: {type: [{author: String, message: String, rating: Number, timestamp: Date}], default: []},
// }, {timestamps: true});

// recipeSchema.index({ name: 'text', category: 'text', tags: 'text' });

describe('Integration tests', () => {
  const app = express();
  app.use(express.json())
  app.use(router);
  const request = supertest(app);
  
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  })
  
  // afterEach(async () => {
  //     await Recipe.deleteMany();
  //   })
    
    it('should save a recipe to the database', async () => {
      const Recipe = mongoose.model('Recipe', recipeSchema);
      const res = await request.post('/recipe', )
    .send(mocks.recipe)

    const recipe = await Recipe.findOne(mocks.recipe)
    expect(recipe).toBe(mocks.recipe)
  })
})
