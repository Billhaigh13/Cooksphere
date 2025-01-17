"use strict";
import cors from "cors";
import express from "express";
import router from "./router";

const app: express.Express = express();
const PORT: number = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//TODO: Add tests to query database
//TODO: Add tests to verify routing is working
//TODO: Add tests to check error handling
