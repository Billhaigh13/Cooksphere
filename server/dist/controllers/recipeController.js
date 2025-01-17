'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReview = exports.postRecipe = exports.getLastAddedRecipes = exports.getRecipesByCategory = exports.getRecipe = exports.getRecipes = void 0;
const recipe_js_1 = __importDefault(require("../models/recipe.js"));
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query) {
            const recipes = yield recipe_js_1.default.find();
            return res.send(recipes);
        }
        else {
            const searchQuery = req.query['q'];
            const recipes = yield recipe_js_1.default.find({ $text: { $search: searchQuery } });
            return res.send(recipes);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error getting recipes!', code: 500 } });
    }
});
exports.getRecipes = getRecipes;
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.recipeId;
        if (!id) {
            return res.status(400).send({ error: { message: 'No recipe id provided!', code: 400 } });
        }
        const recipe = yield recipe_js_1.default.findOne({ _id: id });
        return res.send(recipe);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error getting recipe!', code: 500 } });
    }
});
exports.getRecipe = getRecipe;
const getRecipesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        if (!category) {
            return res.status(400).send({ error: { message: 'No category provided!', code: 400 } });
        }
        const recipes = yield recipe_js_1.default.find({ category });
        return res.send(recipes);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error getting recipes!', code: 500 } });
    }
});
exports.getRecipesByCategory = getRecipesByCategory;
const getLastAddedRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_js_1.default.find().sort({ createdAt: -1 }).limit(10);
        return res.send(recipes);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error getting recipes!', code: 500 } });
    }
});
exports.getLastAddedRecipes = getLastAddedRecipes;
const postRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).send({ error: { message: 'Request body missing!', code: 400 } });
        }
        const recipe = yield recipe_js_1.default.create(body);
        return res.status(201).send(recipe);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error creating recipe!', code: 500 } });
    }
});
exports.postRecipe = postRecipe;
const postReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, message } = req.body;
        if (!rating && !message) {
            return res.status(400).send({ error: { message: 'Missing rating or review!', code: 400 } });
        }
        const id = req.params.recipeId;
        if (!id) {
            return res.status(400).send({ error: { message: 'No recipe id provided!', code: 400 } });
        }
        const recipe = yield recipe_js_1.default.findOne({ _id: id });
        const oldRating = recipe.rating;
        recipe.reviews.push(req.body);
        const newRating = parseFloat(((oldRating + rating) / recipe.reviews.length).toFixed(2));
        recipe.rating = newRating;
        yield recipe.save();
        return res.status(200).send(req.body);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error creating recipe!', code: 500 } });
    }
});
exports.postReview = postReview;
