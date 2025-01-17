"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_js_1 = require("./controllers/categoryController.js");
const recipeController_js_1 = require("./controllers/recipeController.js");
const userController_js_1 = require("./controllers/userController.js");
const router = express_1.default.Router();
//TODO: Split routing into separate routing files
//TODO: Consider changing some routes for clarity
router.get("/recipes", recipeController_js_1.getRecipes);
router.get("/recipes/latest", recipeController_js_1.getLastAddedRecipes);
router.get("/recipes/:recipeId", recipeController_js_1.getRecipe);
router.get("/recipes/category/:category", recipeController_js_1.getRecipesByCategory);
router.post("/recipe", recipeController_js_1.postRecipe);
router.put("/recipes/:recipeId", recipeController_js_1.postReview);
router.get("/categories", categoryController_js_1.getAllCategories);
router.post("/user/authenticate", userController_js_1.login);
router.put("/user/uploaded", userController_js_1.updateUploaded);
router.put("/user/favorites", userController_js_1.updateFavorites);
exports.default = router;
