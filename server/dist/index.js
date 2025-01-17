"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_js_1 = __importDefault(require("./router.js"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use(express_1.default.json());
app.use(router_js_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
