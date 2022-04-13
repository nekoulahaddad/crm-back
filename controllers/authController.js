import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin/admin.js";
import { AdminJWT } from "../models/admin/jwt.js";
import { AdminPWD } from "../models/admin/password.js";

export const addAdmin = async (req, res) => {
  try {
    const { name, surname, email, password, phone } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).send({
        status: "error",
        message: "Админ уже существует",
      });
    }

    const newAdmin = new Admin({
      name,
      surname,
      email,
      phone,
    });

    const newAdminPWD = new AdminPWD({
      admin_id: newAdmin._id,
      password,
      email,
    });

    await newAdmin.save();
    await newAdminPWD.save();

    res.status(200).send({
      status: "ok",
      message: newAdmin,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminPWD.findOne({ email }).exec();

    if (!admin) {
      return res.status(401).send({
        status: "error",
        message: "Админ не найден",
      });
    }

    if (admin.deleted) {
      return res.status(401).send({
        status: "error",
        message: "Админ удален",
      });
    }

    const isMatch = await bcryptjs.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send({
        status: "error",
        message: "Неверный пароль, попробуйте еще раз!",
      });
    }

    const newAdminJWT = new AdminJWT({
      admin_id: admin.admin_id,
      email,
    });

    await newAdminJWT.generateAuthToken();
    await newAdminJWT.generateRefreshToken();
    await newAdminJWT.save();
    res
      .status(200)
      .cookie("refreshToken", newAdminJWT.refresh, {
        httpOnly: true,
      })
      .send({
        status: "ok",
        message: newAdminJWT,
      });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById({ _id: id });

    if (!admin) {
      return res.status(404).send({
        status: "error",
        message: "Админ не найден",
      });
    }

    res.status(200).send({
      status: "ok",
      message: admin,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});

    if (!admins) {
      return res.status(404).send({
        status: "error",
        message: "Админы не найдены",
      });
    }

    res.status(200).send({
      status: "ok",
      message: admins,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin_pwd = await AdminPWD.findOne({ admin_id: id });
    if (!admin_pwd) {
      return res.status(404).send({
        message: "Админ не найден",
      });
    }
    await admin_pwd.remove();

    const admin = await Admin.updateOne(
      { _id: id },
      { $set: { deleted: true } }
    );

    res.status(200).send({
      status: "ok",
      message: "Админ удален",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const refreshTokenAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).send({
        status: "error",
        message: "Токен обновления не предоставлен",
      });
    }
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const Admin = await AdminJWT.findOne({ refresh: refreshToken }).exec();

    if (!Admin) {
      return res.status(401).send({
        message: "Админ не найден",
      });
    }
    await Admin.generateAuthToken();
    res.status(200).send({
      status: "ok",
      message: Admin.token,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await AdminJWT.findOne({ admin_id: id }).exec();

    if (!admin) {
      return res.status(401).send({
        status: "error",
        message: "Админ не найден",
      });
    }

    admin.remove();

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
