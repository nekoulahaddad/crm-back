import mongoose from "mongoose";
const { Types } = mongoose;

import { usersData } from "../data/users";

import { User } from "../models/user";
import { Password } from "../models/password";
import { Role } from "../models/role";
import { City } from "../models/city";
import { CustomID } from "../models/customID";
import { Shop } from "../models/shop";
import { Order } from "../models/order";

import {
  getAllUsers,
  getAllUsersForOneShop,
} from "../aggregations/userAggregations";

export const insertClient = async (req, res) => {
  const user = usersData[4];
  try {
    const displayID = await CustomID.findOneAndUpdate(
      { name: "clientsCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const userRole = await Role.findOne({ value: "client" });
    const userCity = await City.findOne({ name: "Москва" });
    user.role = userRole._id;
    user.city = userCity._id;
    user.displayID = displayID
      ? ("0000000" + displayID.count).slice(-7)
      : "00000000";
    const newUser = new User(user);
    const newPassword = new Password({
      user_id: newUser._id,
      password: "12345678",
      email: user.email,
    });
    await newUser.save();
    await newPassword.save();
    res.status(200).send({
      status: "ok",
      message: newUser,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const insertAdmin = async (req, res) => {
  const user = usersData[4];
  try {
    const displayID = await CustomID.findOneAndUpdate(
      { name: "adminsCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const userRole = await Role.findOne({ value: "admin" });
    const userCity = await City.findOne({ name: "Москва" });
    user.role = userRole._id;
    user.city = userCity._id;
    user.displayID = displayID
      ? ("0000000" + displayID.count).slice(-7)
      : "00000000";
    const newUser = new User(user);
    const newPassword = new Password({
      user_id: newUser._id,
      password: "12345678",
      email: user.email,
    });
    await newUser.save();
    await newPassword.save();
    res.status(200).send({
      status: "ok",
      message: newUser,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const insertPartner = async (req, res) => {
  const user = usersData[3];
  try {
    const displayID = await CustomID.findOneAndUpdate(
      { name: "partnersCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const shop = await Shop.findOne({ name: "Ашан" });
    const userRole = await Role.findOne({ value: "partner" });
    const userCity = await City.findOne({ name: "Москва" });
    user.role = userRole._id;
    user.city = userCity._id;
    user.shop_id = shop._id;
    user.displayID = displayID
      ? ("0000000" + displayID.count).slice(-7)
      : "00000000";
    const newUser = new User(user);
    const newPassword = new Password({
      user_id: newUser._id,
      password: "12345678",
      email: user.email,
    });
    await newUser.save();
    await newPassword.save();
    res.status(200).send({
      status: "ok",
      message: newUser,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const addClient = async (req, res) => {
  try {
    const counter = await CustomID.findOneAndUpdate(
      { name: "clientsCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const newClient = {
      ...usersData[0],
      displayID: counter ? ("0000000" + counter.count).slice(-7) : "00000000",
    };
    const clients = await User.create(newClient);

    res.status(200).send({
      status: "ok",
      message: clients,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getUsersByRole = async (req, res) => {
  let { page, sort_field, sort_direction, limit, searchTerm, userRole } =
    req.query;
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  limit = 10;
  page = 0;
  let users = {};
  try {
    users = await getAllUsers(
      User,
      userRole,
      sort_field,
      sort_direction,
      limit,
      page,
      searchTerm
    );
    if (!users) {
      return res.status(404).send({
        status: "error",
        message: "Пользователи не найдены",
      });
    }
    res.status(200).send({
      message: {
        users: users[0] ? users[0].paginatedResults : null,
        totalUsers: users[0] ? users[0].totalCount.count : 0,
        totalPages: users[0] ? Math.ceil(users[0].totalCount.count / limit) : 0,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getClientsForOneShop = async (req, res) => {
  let { page, limit, searchTerm, cityId } = req.query;
  let { shopId } = req.params;
  let userRole = "client";
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  limit = 6;
  page = 0;

  const shopClientsArray = await Order.find({
    shop_id: Types.ObjectId(shopId),
  }).distinct("client");

  try {
    let users = await getAllUsersForOneShop(
      User,
      userRole,
      limit,
      page,
      searchTerm,
      cityId,
      shopClientsArray
    );
    if (!users) {
      return res.status(404).send({
        status: "error",
        message: "Пользователи не найдены",
      });
    }
    res.status(200).send({
      message: {
        users: users[0] ? users[0].paginatedResults : null,
        totalUsers: users[0] ? users[0].totalCount.count : 0,
        totalPages: users[0] ? Math.ceil(users[0].totalCount.count / limit) : 0,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id }).populate("city");

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Пользователь не найден",
      });
    }

    res.status(200).send({
      status: "ok",
      message: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    await User.updateOne({ _id: id }, { $set: data });
    res.status(200).send({
      status: "ok",
      message: "информация о клиенте успешно изменена",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Пользователь не найден",
      });
    }
    const userPassword = await Password.findById({ user_id: id });
    await user.remove();
    await userPassword.remove();

    res.status(200).send({
      status: "ok",
      message: "Пользователь успешно удалён",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};
