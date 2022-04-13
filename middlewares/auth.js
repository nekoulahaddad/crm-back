import config from "../config/index.js";
const { JWT_SECRET } = config;
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.send({
        status: 403,
        message: "Токен не найден",
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.token = token;
    return next();
  } catch (error) {
    res.send({
      status: 401,
      message: "Токен истёк",
    });
  }
};
