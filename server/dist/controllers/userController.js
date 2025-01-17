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
exports.updateFavorites = exports.updateUploaded = exports.login = void 0;
const user_js_1 = __importDefault(require("../models/user.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({ error: { message: 'Missing credentials!', code: 401 } });
        }
        const user = yield user_js_1.default.findOne({ email }).populate('uploadedRecipes').populate('favoriteRecipes');
        if (!user) {
            return res.status(401).send({ error: 'Wrong credentials' });
        }
        if (bcrypt_1.default.compareSync(password, user.password)) {
            return res.send(user);
        }
        else {
            return res.status(401).send({ error: 'Wrong credentials' });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error getting user!', code: 500 } });
    }
});
exports.login = login;
const updateUploaded = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, recipe } = req.body;
        if (!user) {
            return res.status(400).send({ error: { message: 'Missing user!', code: 400 } });
        }
        else if (!recipe) {
            return res.status(400).send({ error: { message: 'Missing recipe!', code: 400 } });
        }
        const userDB = yield user_js_1.default.findOne({ email: user.email });
        userDB.uploadedRecipes.push(recipe);
        yield userDB.save();
        res.send(userDB);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error updated uploaded recipes for user!', code: 500 } });
    }
});
exports.updateUploaded = updateUploaded;
const updateFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, recipe, favorite } = req.body;
        if (!user) {
            return res.status(400).send({ error: { message: 'Missing user!', code: 400 } });
        }
        else if (!recipe) {
            return res.status(400).send({ error: { message: 'Missing recipe!', code: 400 } });
        }
        const userDB = yield user_js_1.default.findOne({ email: user.email });
        if (favorite) {
            userDB.favoriteRecipes.push(recipe);
        }
        else {
            userDB.favoriteRecipes = userDB.favoriteRecipes.filter(favorite => favorite.toString() !== recipe._id);
        }
        yield userDB.save();
        res.send(userDB);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ error: { message: 'Error updated uploaded recipes for user!', code: 500 } });
    }
});
exports.updateFavorites = updateFavorites;
