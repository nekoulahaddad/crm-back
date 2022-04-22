import { Shop } from "../models/shop";
import mongoose from "mongoose";
import { productsData } from "../data/products";
import { Category } from "../models/category";
import { MainCategory } from "../models/mainCategory";
import { Product } from "../models/product";
const { Types } = mongoose;

export const insertProduct = async (req, res) => {
  const randomNum = 0;
  const product = productsData[randomNum];
  try {
    const shop = await Shop.find({});
    const category = await Category.find({});
    //const mainCategory = await MainCategory.find({});
    product.shop_id = shop[randomNum]._id;
    product.category_id = category[randomNum]._id;
    //product.mainCategory_id = mainCategory[randomNum]._id;

    const newProduct = new Product(product);

    await newProduct.save();
    res.status(200).send({
      status: "ok",
      message: newProduct,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
