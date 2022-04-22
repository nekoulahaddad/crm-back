import { User } from "../models/user";
import mongoose from "mongoose";
import { ordersData } from "../data/orders";
import { StatusOrder } from "../models/statusOrder";
import { City } from "../models/city";
import { Product } from "../models/product";
import { CustomID } from "../models/customID";
import { Order } from "../models/order";
const { Types } = mongoose;

export const insertOrders = async (req, res) => {
  const randomNum = 0;
  const order = ordersData[randomNum];
  try {
    const displayID = await CustomID.findOneAndUpdate(
      { name: "ordersCounter" },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    const products = await Product.find({});
    const orderClient = await User.findOne({ firstName: "Конcтантин" });
    const orderCity = await City.findOne({ name: "Москва" });
    const statusOrder = await StatusOrder.findOne({ value: "created" });

    const productsObject = products.map((product) => {
      return {
        product_id: product._id,
        price: product.price,
        quantity: "3",
      };
    });
    order.products = productsObject;
    order.statusOrder = statusOrder._id;
    order.city = orderCity._id;
    order.client = orderClient._id;
    order.displayID = displayID
      ? ("0000000" + displayID.count).slice(-7)
      : "00000000";

    const newOrder = new Order(order);

    await newOrder.save();
    res.status(200).send({
      status: "ok",
      message: newOrder,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  let { page, sort_field, sort_direction, limit, searchTerm } = req.query;
  let orders = null;
  let countOrders = "";
  try {
    if (!searchTerm) {
      countOrders = await Order.find({}).count();
      orders = await Order.find({})
        .limit(limit)
        .skip(limit * page)
        .sort({ [sort_field]: sort_direction })
        .exec();
    } else {
      countOrders = await Order.find({ displayID: searchTerm }).count();
      orders = await Order.find({ displayID: searchTerm })
        .limit(limit)
        .skip(limit * page)
        .sort({ [sort_field]: sort_direction })
        .exec();
    }
    if (!orders) {
      return res.status(404).send({
        status: "error",
        message: "Заказы не найдены",
      });
    }
    res.status(200).send({
      status: "ok",
      message: { orders, total_pages: Math.ceil(countOrders / limit) },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const getOrdersByClientId = async (req, res) => {
  const { id } = req.params;
  let { page, sort_field, sort_direction, limit } = req.query;
  try {
    const countOrders = await Order.find({}).count();
    const orders = await Order.find({ "Order._id": id })
      .limit(limit)
      .skip(limit * page)
      .sort({ [sort_field]: sort_direction })
      .exec();

    if (!orders) {
      return res.status(404).send({
        status: "error",
        message: "Заказы не найдены",
      });
    }
    res.status(200).send({
      status: "ok",
      message: { orders, total_orders_count: Math.ceil(countOrders / limit) },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById({ _id: id });

    if (!order) {
      return res.status(404).send({
        status: "error",
        message: "Заказ не найден",
      });
    }
    await order.remove();

    res.status(200).send({
      status: "ok",
      message: "Заказ успешно удалён",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};
