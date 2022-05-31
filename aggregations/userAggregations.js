import mongoose from "mongoose";
const { Types } = mongoose;

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
    .lookup({
      from: "cities",
      localField: "city",
      foreignField: "_id",
      as: "city",
    })
    .unwind("$city")
    .lookup({
      from: "countries",
      localField: "city.country_id",
      foreignField: "_id",
      as: "country",
    })
    .unwind("$country")
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

export const getAllUsersForOneShop = async (
  User,
  userRole,
  limit,
  page,
  searchTerm,
  cityId,
  shopClientsArray
) => {
  let matchCriteria = [
    { "role.value": userRole },
    { active: true },
    { _id: { $in: shopClientsArray } },
  ];
  if (searchTerm) {
    let regex = new RegExp(RegExp.quote(searchTerm), "gi");
    matchCriteria.push({
      $or: [{ firstName: regex }, { phone: regex }],
    });
  }
  cityId && matchCriteria.push({ city: Types.ObjectId(cityId) });

  const users = await User.aggregate()
    .lookup({
      from: "roles",
      localField: "role",
      foreignField: "_id",
      as: "role",
    })
    .unwind("$role")
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
    .exec();
  return users;
};
