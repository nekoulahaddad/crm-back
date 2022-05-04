export const getAllUsers = async (
  User,
  userRole,
  sort_field,
  sort_direction,
  limit,
  page,
  searchTerm
) => {
  let matchCriteria = {
    $and: [{ "role.value": userRole }, { active: true }],
  };
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria = {
      $and: [
        { "role.value": userRole },
        { active: true },
        {
          $or: [{ firstName: regex }, { phone: regex }],
        },
      ],
    };
  }
  const users = await User.aggregate()
    .lookup({
      from: "roles",
      localField: "role",
      foreignField: "_id",
      as: "role",
    })
    .unwind("$role")
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
    .exec();
  return users;
};
