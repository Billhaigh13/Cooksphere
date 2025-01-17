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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const category_js_1 = __importDefault(require("../models/category.js"));
const recipe_js_1 = __importDefault(require("../models/recipe.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
const imagePaths_js_1 = require("../../../client/src/utils/imagePaths.js");
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '1', '2', '3', '4', '5', '6',
    '7', '8', '9'
];
const recipes = [];
const categories = [];
const cloudinaryUrl = `https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856/`;
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield recipe_js_1.default.deleteMany();
    yield category_js_1.default.deleteMany();
    yield user_js_1.default.deleteMany();
    console.log('MongoDB cleared!');
});
const formatRecipe = (recipe) => {
    if (!categories.includes(recipe.strCategory)) {
        categories.push(recipe.strCategory);
    }
    const ingredients = [];
    for (let i = 1; i < 101; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (!ingredient && !measure) {
            break;
        }
        else if (ingredient.trim() === '' && measure.trim() === '') {
            continue;
        }
        ingredients.push({
            ingredient: ingredient.trim(),
            measure: measure.trim()
        });
    }
    return {
        name: recipe.strMeal,
        // TODO area: recipe.strArea,
        category: recipe.strCategory,
        instructions: recipe.strInstructions.split('\r\n').filter(instr => instr.trim() !== ''),
        image: recipe.strMealThumb,
        tags: recipe.strTags ? recipe.strTags.split(',').map(tag => tag.trim()) : [],
        ingredients: ingredients,
        cookingTimeInMinutes: 45,
    };
};
const fillDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const letter of alphabet) {
        const response = yield fetch(`${BASE_URL}/search.php?f=${letter}`);
        const data = yield response.json();
        if (data.meals) {
            data.meals.map(meal => recipes.push(meal));
        }
    }
    const formattedRecipes = recipes.map(recipe => formatRecipe(recipe));
    yield recipe_js_1.default.insertMany(formattedRecipes);
    const formattedCategories = categories.map(category => ({ name: category, image: `${cloudinaryUrl}${imagePaths_js_1.categories[category]}.jpg` }));
    yield category_js_1.default.insertMany(formattedCategories);
    const user = {
        firstname: 'Zappe',
        lastname: 'Thomson',
        email: 'zappe.thomson@test.com',
        password: 'Test123!'
    };
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
    yield user_js_1.default.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
    console.log('MongoDB filled successfully!');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
    yield fillDatabase();
    yield mongoose_1.default.disconnect();
    console.log('Disconnected to MongoDB!');
}))();
