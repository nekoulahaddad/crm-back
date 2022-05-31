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

const whitelist = [
  "http://localhost:3010",
  "http://localhost:3020",
  "http://localhost:3030",
  "https://admin.zumzak.ru",
  "https://shop.zumzak.ru",
  "https://clients.zumzak.ru",
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(indexRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`everything is ok ...${port}`);
});

export const server = app;
