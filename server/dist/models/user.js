"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const userSchema = new index_js_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    image: { type: String, required: true, default: 'man' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteRecipes: { type: [{ type: index_js_1.default.Schema.Types.ObjectId, ref: 'Recipe' }], default: [] },
    uploadedRecipes: { type: [{ type: index_js_1.default.Schema.Types.ObjectId, ref: 'Recipe' }], default: [] },
}, { timestamps: true });
const User = index_js_1.default.model('User', userSchema);
exports.default = User;
