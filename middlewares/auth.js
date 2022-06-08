import config from "../config/index.js";
const { JWT_SECRET } = config;
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.send({
        status: 403,
        message: "Токен не найден",
      });
    }
    const { _id } = await jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({
      _id: _id,
      active: true,
    }).populate("role");
    if (!user) IamAnError;
    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    res.send({
      status: 401,
      message: "Ошибка авторизации, пользователь не найден",
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
