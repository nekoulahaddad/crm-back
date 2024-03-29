import { ShopCategory } from "../models/shopCategory";

export const addCategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const toggleVisible = async (req, res) => {
  const {
    body: { id },
    shop_id,
  } = req;

  try {
    const category = await ShopCategory.findOne({
      _id: id,
      shop: shop_id,
    });

    if (!category) {
      return res.status(404).send({
        status: "error",
        message: `Категория ${id} не найдена`,
      });
    }

    category.visible = !category.visible;
    await category.save();

    res.status(200).send({
      status: "ok",
      category,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const {
    body: { id },
    shop_id,
  } = req;

  try {
    await ShopCategory.findOneAndDelete({
      _id: id,
      shop: shop_id,
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};
