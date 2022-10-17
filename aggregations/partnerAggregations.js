export const getAllPartners = async (
  Shop,
  sort_field,
  sort_direction,
  limit,
  page,
  searchTerm
) => {
  let matchCriteria = [];
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria.push({ name: regex });
  }

  const partners = await Shop.aggregate()
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
    .unwind("$paginatedResults.tariffs")
    .lookup({
      from: "tariffs",
      localField: "paginatedResults.tariffs.tariff",
      foreignField: "_id",
      as: "paginatedResults.tariffs.tariff",
    })
    .unwind("$paginatedResults.tariffs.tariff")
    .group({
      _id: "$paginatedResults._id",
      totalCount: { $first: "$totalCount" },
      tariffs: {
        $push: "$paginatedResults.tariffs",
      },
    })
    .lookup({
      from: "shops",
      localField: "_id",
      foreignField: "_id",
      as: "shops",
    })
    .unwind("$shops")
    .addFields({
      "shops.tariffs": "$tariffs",
      "shops.totalCount": "$totalCount",
    })
    .replaceRoot({
      shops: "$shops",
    })
    .exec();
  return partners;
};
