import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/indexRouter";

import config from "./config/index";

const app = express();
const db = config.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(db)
  .then(() => console.log("the database is ready to use ..."))
  .catch((err) => console.log(err));

app.use(cors({ credentials: true, origin: "http://localhost:3030" }));

app.use(indexRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`everything is ok ...${port}`);
});

export const server = app;
