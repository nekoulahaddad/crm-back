import { Shop } from "../models/shop";
import { productsData } from "../data/products";
import { Category } from "../models/category";
import { MainCategory } from "../models/mainCategory";
import { Product } from "../models/product";
import { User } from "../models/user";
export const insertProduct = async (req, res) => {
  const randomNum = 0;
  const product = productsData[randomNum];
  try {
    const shop = await Shop.find({});
    const category = await Category.find({});
    const mainCategory = await MainCategory.find({});
    product.shop_id = shop[randomNum]._id;
    product.category_id = category[randomNum]._id;
    product.mainCategory_id = mainCategory[randomNum]._id;

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

export const changeSeo = async (req, res) => {
  const { id } = req.params;
  const { title, keywords, description } = req.body;

  try {
    const productForChange = await Product.findById(id);
    if (!productForChange)
      return res.status(500).send({
        status: "error",
        message: "Такого магазина не существует!",
      });

    await Product.findByIdAndUpdate(id, {
      $set: {
        seo: {
          title,
          keywords,
          description,
        },
      },
    });

    const productForSend = await Product.findById(id);
    res.send({
      status: "ok",
      data: productForSend,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const clearSeo = async (req, res) => {
  const { id } = req.params;

  try {
    const productForChange = await Product.findById(id);
    if (!productForChange)
      return res.status(500).send({
        status: "error",
        message: "Такого товара не существует!",
      });

    await Product.findByIdAndUpdate(id, {
      $set: {
        seo: {
          title: "",
          keywords: "",
          description: "",
        },
      },
    });

    res.send({
      status: "ok",
      message: "SEO cleared!",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category_id");
    if (!product) {
      return res.status(404).send({
        status: "error",
        message: "Тавар не найден",
      });
    }
    if (req.user) {
      await User.update(
        {
          $expr: {
            $lte: [
              {
                $size: "$watchedProducts",
              },
              10,
            ],
          },
          _id: req.user._id,
          watchedProducts: { $ne: product._id },
        },
        { $push: { watchedProducts: product._id } }
      );
    }
    res.status(200).send({
      status: "ok",
      message: product,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
