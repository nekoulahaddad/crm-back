import { Order } from "../models/order/order.js";
import { Shop } from "../models/shop/shop.js";
import { OrderStatus } from "../models/order/status.js";
import { Region } from "../models/location/region.js";
import { ordersData } from "../data/orders.js";
import { Counter } from "../models/counter/counter.js";

export const insertOrders = async (req, res) => {
  try {
    const Order = await Order.findOne();
    const OrderObject = {
      _id: Order._id,
      name: Order.name,
    };
    const shop = new Shop({
      name: "Auchan",
      subdomain: "Auchan.zumzak.ru",
    });
    const shopObject = {
      _id: shop._id,
      name: shop.name,
    };
    const status = new OrderStatus({
      value: "Доставлен",
      title: "Доставлен",
    });
    const statusObject = {
      _id: status._id,
      value: status.value,
    };
    const region = new Region({
      value: "Москва",
      title: "Москва",
      translations: [],
      country: {
        _id: "44444",
        value: "Россия",
      },
    });
    const regionObject = {
      _id: region._id,
      value: region.value,
    };
    const counter = await Counter.findOneAndUpdate({ name: "ordersCounter" }, { $inc: { count: 1 } }, { upsert: true });

    const newOrder = new Order({
      ...ordersData,
      Order: OrderObject,
      shop: shopObject,
      status: statusObject,
      region: regionObject,
      displayID: counter ? ("00000000000000" + counter.count).slice(-14) : "000000000000000",
    });
    console.log(newOrder);

    const orders = await newOrder.save();
    res.status(200).send({
      status: "ok",
      message: orders,
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
