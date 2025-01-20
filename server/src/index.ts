"use strict";
import cors from "cors";
import express from "express";
import router from "./router";
import { connectDB } from "./models";

const app: express.Express = express();
const PORT: number = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(router);

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
