"use strict";
import Category from "../models/category";
import { Request, Response } from "express";
import { CategoryType } from "../types/types";

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: { message: "Error getting categories!", code: 500 } });
  }
};

export { getAllCategories };
