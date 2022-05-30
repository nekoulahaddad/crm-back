export const getAllPartners = async (
  Shop,
  sort_field,
  sort_direction,
  limit,
  page,
  searchTerm
) => {
  let matchCriteria = [{ visible: true }];
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria.push({ name: regex });
  }

  const orders = await Shop.aggregate()
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
    .exec();
  return orders;
};
