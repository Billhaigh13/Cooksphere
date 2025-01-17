"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const recipeSchema = new index_js_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    // TODO area: str  (needed? maybe for search)
    instructions: { type: [String], required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    ingredients: { type: [{ ingredient: String, measure: String }], required: true },
    cookingTimeInMinutes: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: [{ author: String, message: String, rating: Number, timestamp: Date }], default: [] },
}, { timestamps: true });
recipeSchema.index({ name: 'text', category: 'text', tags: 'text' });
const Recipe = index_js_1.default.model('Recipe', recipeSchema);
exports.default = Recipe;
