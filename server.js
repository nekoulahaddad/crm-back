import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes";

import path from "path";
import config from "./config/index.js";
const __dirname = path.resolve();
const app = express();
const db = config.MONGO_URI;
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(db)
  .then(() => console.log("the database is ready to use ..."))
  .catch((err) => console.log(err));

app.use(cors({ credentials: true, origin: "http://localhost:3030" }));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/category", categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`everything is ok ...${port} ${process.env.NODE_ENV}`);
});

export const server = app;
