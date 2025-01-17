"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const categorySchema = new index_js_1.default.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});
const Category = index_js_1.default.model('Category', categorySchema);
exports.default = Category;
