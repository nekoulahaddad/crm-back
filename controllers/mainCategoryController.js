import { MainCategory } from "../models/mainCategory";

export const addMainCategory = async (req, res) => {
  const { title, visible, translations } = req.body

  try {
    const existingCategory = await MainCategory.findOne({ title })
    if (existingCategory) return res.status(500).send({ status: "error", message: "Категория уже существует!" })

    const newCategory = await MainCategory.create({ title, visible, translations })
    res.status(200).send({
      status: "ok",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
};
