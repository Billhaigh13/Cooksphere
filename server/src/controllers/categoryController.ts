'use strict';
import Category from '../models/category';
import { Request, Response } from 'express';

const getAllCategories = async (req: Request, res: Response): Promise<any> => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: {message: 'Error getting categories!', code: 500}});
  }
};

export {getAllCategories};