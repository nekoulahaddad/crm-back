import { User } from "../models/user";
import { ordersData } from "../data/orders";
import { StatusOrder } from "../models/statusOrder";
import { City } from "../models/city";
import { Product } from "../models/product";
import { CustomID } from "../models/customID";
import { Order } from "../models/order";
import {
  getAllOrders,
  getAllOrdersForOneShop,
} from "../aggregations/orderAggregations";
import {
  today,
  currentMonthStart,
  currentMonthEnd,
  currentWeekStart,
  tomorrow,
} from "../utils/timeHelpers";
import { Shop } from "../models/shop";

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
    const shop = await Shop.find({}).limit(1);

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
    order.shop_id = shop[0]._id;
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
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  limit = 10;
  page = 0;
  let orders = {};
  try {
    orders = await getAllOrders(
      Order,
      sort_field,
      sort_direction,
      limit,
      page,
      searchTerm,
      false
    );
    if (!orders) {
      return res.status(404).send({
        status: "error",
        message: "Заказы не найдены",
      });
    }
    orders = orders.map((order) => order.order);
    res.status(200).send({
      status: "ok",
      message: {
        orders: orders,
        totalOrders: orders[0] ? orders[0].totalCount.count : 0,
        totalPages: orders[0]
          ? Math.ceil(orders[0].totalCount.count / limit)
          : 0,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getOrdersForOneShop = async (req, res) => {
  let { page, cityId, statusId, limit, searchTerm, dateFilter } = req.query;
  const { shopId } = req.params;
  let dateFrom =
    dateFilter === "day"
      ? today
      : dateFilter === "month"
      ? currentMonthStart
      : dateFilter === "week"
      ? currentWeekStart
      : null;

  let dateEnd = dateFilter === "month" ? currentMonthEnd : tomorrow;

  limit = 10;
  page = 0;
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  limit = 10;
  page = 0;
  let orders = {};
  try {
    orders = await getAllOrdersForOneShop(
      Order,
      cityId,
      statusId,
      limit,
      page,
      searchTerm,
      shopId,
      dateFrom,
      dateEnd
    );
    if (!orders) {
      return res.status(404).send({
        status: "error",
        message: "Заказы не найдены",
      });
    }
    orders = orders.map((order) => order.order);
    res.status(200).send({
      status: "ok",
      message: {
        orders: orders,
        totalOrders: orders[0] ? orders[0].totalCount.count : 0,
        sumPices: orders[0] ? orders[0].totalSum.sumPices : 0,
        sumDelivery: orders[0] ? orders[0].totalSum.sumDelivery : 0,
        totalPages: orders[0]
          ? Math.ceil(orders[0].totalCount.count / limit)
          : 0,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getOrdersByClientId = async (req, res) => {
  let { page, sort_field, sort_direction, limit } = req.query;
  const { clientId } = req.params;
  limit = 10;
  page = 0;
  let orders = {};
  try {
    orders = await getAllOrders(
      Order,
      sort_field,
      sort_direction,
      limit,
      page,
      false,
      clientId
    );
    if (!orders) {
      return res.status(404).send({
        status: "error",
        message: "Заказы не найдены",
      });
    }
    orders = orders.map((order) => order.order);
    res.status(200).send({
      status: "ok",
      message: {
        orders: orders,
        totalOrders: orders[0] ? orders[0].totalCount.count : 0,
        totalPages: orders[0]
          ? Math.ceil(orders[0].totalCount.count / limit)
          : 0,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
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
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById({ _id: id });

    if (!order) {
      return res.status(404).send({
        status: "error",
        message: "Заказ не найден",
      });
    }

    res.status(200).send({
      status: "ok",
      message: order,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    await Order.updateOne({ _id: id }, { $set: data });
    res.status(200).send({
      status: "ok",
      message: "информация о заказе успешно изменена",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
