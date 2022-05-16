export const getAllOrders = async (
  Order,
  sort_field,
  sort_direction,
  limit,
  page,
  searchTerm
) => {
  let matchCriteria = {};
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria = { displayID: regex };
  }
  const orders = await Order.aggregate()
    .match(matchCriteria)
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
  sortFields,
  limit,
  page,
  searchTerm,
  shopId
) => {
  let matchCriteria = [{ shop_id: shopId }];
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria.push({ displayID: regex });
  }
  if (sortFields) {
    for (let sortField of sortFields) {
      matchCriteria.push(sortField);
    }
  }
  const orders = await Order.aggregate()
    .lookup({
      from: "cities",
      localField: "city",
      foreignField: "_id",
      as: "city",
    })
    .unwind("$city")
    .lookup({
      from: "statusorders",
      localField: "statusOrder",
      foreignField: "_id",
      as: "statusOrder",
    })
    .unwind("$statusOrder")
    .match({ $and: matchCriteria })
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
