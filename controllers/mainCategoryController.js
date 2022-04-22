import { MainCategory } from "../models/mainCategory";

export const addMainCategory = async (req, res) => {
  const { title, visible, translations } = req.body

  try {
    const existingCategory = await MainCategory.findOne({ title })
    if (existingCategory) return res.send({ message: "Категория уже существует!" })

    const newCategory = await MainCategory.create({ title, visible, translations })
    res.status(200).send({
      status: "ok",
      data: newCategory,
    });
  } catch (error) {
    console.log(error.name)
    console.log(error.message)

    res.send({
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
};
