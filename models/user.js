import mongoose from "mongoose";
const { Schema, Types } = mongoose;
import config from "../config/index.js";
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = config;
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    displayID: { type: String, required: true },
    birthday: { type: Date, required: false, default: null },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: ["мужской", "женский", "другой"],
      required: false,
    },
    active: { type: Boolean, required: true, default: true },
    role: { type: Types.ObjectId, ref: "Role" },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    city: { type: Types.ObjectId, ref: "City" },
    shop_id: { type: Types.ObjectId, ref: "Shop" },
    watchedProducts: [{ type: Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const secret = JWT_SECRET;
  const token = jwt.sign({ _id: user._id }, secret, {
    expiresIn: "300s",
  });
  user.accessToken = token;
};

userSchema.methods.generateRefreshToken = function () {
  const user = this;
  const secret = REFRESH_TOKEN_SECRET;
  const refresh = jwt.sign({ _id: user._id }, secret, {
    expiresIn: "30 days",
  });
  user.refreshToken = refresh;
};

export const User = mongoose.model("User", userSchema);
