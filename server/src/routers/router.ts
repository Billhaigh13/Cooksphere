"use strict";
import express, { Router } from "express";
import recipeRouter from "./recipeRouter";
import categoryRouter from "./categoryRouter";
import userRouter from "./userRouter";

const router: Router = express.Router();

router.use("/recipes", recipeRouter);
router.use("/categories", categoryRouter);
router.use("/user", userRouter);

export default router;
