import mongoose from "mongoose";
const { Types } = mongoose;
export const getAllOrders = async (
  Order,
  sort_field,
  sort_direction,
  limit,
  page,
  searchTerm,
  clientId
) => {
  let matchCriteria = [{ visible: true }];
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria.push({ displayID: regex });
  }
  if (clientId) {
    matchCriteria.push({ client: Types.ObjectId(clientId) });
  }
  const orders = await Order.aggregate()
    .match({ $and: matchCriteria })
    .sort({ [sort_field]: sort_direction })
    .facet({
      paginatedResults: [{ $skip: limit * page }, { $limit: limit }],
      totalCount: [
        {
          $count: "count",
        },
      ],
    })
    .unwind("$totalCount")
    .unwind("$paginatedResults")
    .unwind("$paginatedResults.products")
    .lookup({
      from: "products",
      localField: "paginatedResults.products.product_id",
      foreignField: "_id",
      as: "paginatedResults.products.product",
    })
    .unwind("$paginatedResults.products.product")
    .group({
      _id: "$paginatedResults._id",
      totalCount: { $first: "$totalCount" },
      products: {
        $push: "$paginatedResults.products",
      },
    })
    .lookup({
      from: "orders",
      localField: "_id",
      foreignField: "_id",
      as: "orders",
    })
    .unwind("$orders")
    .addFields({
      "orders.products": "$products",
      "orders.totalCount": "$totalCount",
    })
    .replaceRoot({
      order: "$orders",
    })
    .lookup({
      from: "users",
      localField: "order.client",
      foreignField: "_id",
      as: "order.client",
    })
    .unwind("$order.client")
    .lookup({
      from: "shops",
      localField: "order.shop_id",
      foreignField: "_id",
      as: "order.shop",
    })
    .unwind("$order.shop")
    .exec();
  return orders;
};

export const getAllOrdersForOneShop = async (
  Order,
  cityId,
  statusId,
  limit,
  page,
  searchTerm,
  shopId,
  dateFrom,
  dateEnd
) => {
  let matchCriteria = [{ shop_id: Types.ObjectId(shopId) }, { visible: true }];
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria.push({ displayID: regex });
  }
  cityId && matchCriteria.push({ city: Types.ObjectId(cityId) });
  statusId && matchCriteria.push({ statusOrder: Types.ObjectId(statusId) });
  dateFrom &&
    dateEnd &&
    matchCriteria.push({ createdAt: { $gte: dateFrom, $lte: dateEnd } });
  const orders = await Order.aggregate()
    .match({ $and: matchCriteria })
    .facet({
      paginatedResults: [{ $skip: limit * page }, { $limit: limit }],
      totalCount: [
        {
          $count: "count",
        },
      ],
      totalSum: [
        {
          $group: {
            _id: Date.now(),
            sumPices: { $sum: "$sum" },
            sumDelivery: { $sum: "$deliveredPrice" },
          },
        },
      ],
    })
    .unwind("$totalCount")
    .unwind("$totalSum")
    .unwind("$paginatedResults")
    .unwind("$paginatedResults.products")
    .lookup({
      from: "products",
      localField: "paginatedResults.products.product_id",
      foreignField: "_id",
      as: "paginatedResults.products.product",
    })
    .unwind("$paginatedResults.products.product")
    .group({
      _id: "$paginatedResults._id",
      totalCount: { $first: "$totalCount" },
      totalSum: { $first: "$totalSum" },
      products: {
        $push: "$paginatedResults.products",
      },
    })
    .lookup({
      from: "orders",
      localField: "_id",
      foreignField: "_id",
      as: "orders",
    })
    .unwind("$orders")
    .addFields({
      "orders.products": "$products",
      "orders.totalCount": "$totalCount",
      "orders.totalSum": "$totalSum",
      "orders.city": "$city",
    })
    .replaceRoot({
      order: "$orders",
    })
    .lookup({
      from: "users",
      localField: "order.client",
      foreignField: "_id",
      as: "order.client",
    })
    .unwind("$order.client")
    .lookup({
      from: "shops",
      localField: "order.shop_id",
      foreignField: "_id",
      as: "order.shop",
    })
    .unwind("$order.shop")
    .exec();
  return orders;
};
