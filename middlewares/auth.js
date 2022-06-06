import config from "../config/index.js";
const { JWT_SECRET } = config;
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.send({
        status: 403,
        message: "Токен не найден",
      });
    }
    const user = await jwt.verify(token, JWT_SECRET);
    req.token = token;
    const userObject = user
      ? await User.findById(user._id).populate("role")
      : null;
    req.user = userObject;
    return next();
  } catch (error) {
    res.send({
      status: 401,
      message: "Токен истёк",
    });
  }
};

export const checkPartner = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role.value !== "partner") {
      return res.send({
        status: 403,
        message: "не доступен",
      });
    }
    req.shop_id = user.shop_id ? user.shop_id : null;
    return next();
  } catch (error) {
    res.send({
      status: 401,
      message: error.message,
    });
  }
};
