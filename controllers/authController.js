import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Password } from "../models/password.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Password.findOne({ email }).exec();
    const userInfo = await User.findOne({ email }).populate("role").exec();

    if (!user || !userInfo) {
      return res.status(401).send({
        status: "error",
        message: "Пользователь не найден",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        status: "error",
        message: "Неверный пароль, попробуйте еще раз!",
      });
    }

    await userInfo.generateAuthToken();
    await userInfo.generateRefreshToken();
    await userInfo.save();
    res
      .status(200)
      .cookie("refreshToken", userInfo.refreshToken, {
        httpOnly: true,
      })
      .send({
        status: "ok",
        message: userInfo,
      });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).send({
        status: "error",
        message: "Токен обновления не предоставлен",
      });
    }
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) {
      return res.status(401).send({
        message: "Пользователь не найден",
      });
    }
    await user.generateAuthToken();
    res.status(200).send({
      status: "ok",
      message: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const reInitializedTokens = {
      refreshToken: "",
      accessToken: "",
    };

    await User.update({ _id: id }, reInitializedTokens).exec();

    res.status(200).send({
      status: "ok",
      message: "Выйти успешно",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Токен истёк",
    });
  }
};

export const testAuth = (req, res) => {
  res.status(200).send({ status: "ok", message: req.token });
};
