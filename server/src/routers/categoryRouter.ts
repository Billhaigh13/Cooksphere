"use strict";
import express from "express";
import { getAllCategories } from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);

export default categoryRouter;
