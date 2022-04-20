import { usersData } from "../data/users";
import { User } from "../models/user";
import { Password } from "../models/password";
import { Role } from "../models/role";
import { City } from "../models/city";
import { CustomID } from "../models/customID";

export const insertClient = async (req, res) => {
  const user = usersData[1];
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
  const user = usersData[3];
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
    const userRole = await Role.findOne({ value: "partner" });
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

export const addClient = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "clientsCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const newClient = {
      ...usersData[0],
      displayID: counter ? ("0000000" + counter.count).slice(-7) : "00000000",
    };
    const clients = await Customer.create(newClient);

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

export const getClients = async (req, res) => {
  let { page, sort_field, sort_direction, limit, searchTerm } = req.query;
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  let clients = {};
  let countProducts = "";
  var regex = new RegExp(RegExp.quote(searchTerm), "gi");
  try {
    if (!searchTerm) {
      countProducts = await Customer.find({}).count();
      clients = await Customer.find({})
        .limit(limit)
        .skip(limit * page)
        .sort({ [sort_field]: sort_direction })
        .exec();
    } else {
      countProducts = await Customer.find({
        $or: [{ name: regex }, { phone: regex }],
      }).count();
      clients = await Customer.find({
        $or: [{ name: regex }, { phone: regex }],
      })
        .limit(limit)
        .skip(limit * page)
        .sort({ [sort_field]: sort_direction })
        .exec();
    }
    if (!clients) {
      return res.status(404).send({
        status: "error",
        message: "Клиенты не найдены",
      });
    }
    res.status(200).send({
      status: "ok",
      message: { clients, total_pages: Math.ceil(countProducts / limit) },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Customer.findById({ _id: id });

    if (!client) {
      return res.status(404).send({
        status: "error",
        message: "Клиент не найден",
      });
    }

    res.status(200).send({
      status: "ok",
      message: client,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const editClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const client = await Customer.updateOne({ _id: id }, data);
    res.status(200).send({
      status: "ok",
      message: "информация о клиенте успешно изменена",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Customer.findById({ _id: id });
    if (!client) {
      return res.status(404).send({
        status: "error",
        message: "клиент не найден",
      });
    }
    await client.remove();
    res.status(200).send({
      status: "ok",
      message: "Клиент успешно удалён",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};
