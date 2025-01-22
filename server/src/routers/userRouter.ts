"use strict";
import express from "express";
import {
  login,
  updateUploaded,
  updateFavorites,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/authenticate", login);
userRouter.put("/uploaded", updateUploaded);
userRouter.put("/favorites", updateFavorites);

export default userRouter;
