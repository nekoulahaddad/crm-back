import { Category } from "../models/category"

export const addCategory = async (req, res) => {
  const { body } = req
  const { title, images, slug, visible, pending, parent_id, seo, translations, banners } = body
  const emptySeo = !seo || Object.keys(seo).length === 0
  const emptyTranslations = !translations || Object.keys(translations).length === 0

  const defaultSeo = {
    "title": "",
    "keywords": "",
    "description": ""
  }
  const defaultTranslations = {
    en: {
      title: ""
    }
  }

  try {
    const newCategory = await Category.create({
      title,
      images,
      slug,
      visible,
      pending,
      parent_id,
      seo: emptySeo ? defaultSeo : seo,
      translations: emptyTranslations ? defaultTranslations : translations,
      banners
    })

    res.send({
      status: "ok",
      data: newCategory
    })

  } catch (error) {
    res.status(500).send({
      error: {
        status: "error",
        name: error.name,
        message: error.message
      }
    })
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params

  try {
    const categoryForDelete = await Category.findById(id)

    if (!categoryForDelete) return res.send({ status: "error", message: "Такой категории не существует!" })

    await Category.findByIdAndRemove(id)
    res.send({
      status: "ok",
      message: "Категория удалена!"
    })
  } catch (error) {
    res.status(500).send({
      error: {
        status: "error",
        name: error.name,
        message: error.message
      }
    })
  }
};

export const changeSeo = async (req, res) => {
  const { id } = req.params
  const { title, keywords, description } = req.body

  try {
    const categoryForChange = await Category.findById(id)
    if (!categoryForChange) return res.send({ status: "error", message: "Такой категории не существует!" })

    await Category.findByIdAndUpdate(
      id,
      { $set: {
          seo: {
            title,
            keywords,
            description
          }
        }
      }
    )

    const categoryForSend = await Category.findById(id)
    res.send({
      status: "ok",
      data: categoryForSend
    })
  } catch (error) {
    res.status(500).send({
      error: {
        status: "error",
        name: error.name,
        message: error.message
      }
    })
  }
};

export const clearSeo = async (req, res) => {
  const { id } = req.params

  try {
    const categoryForChange = await Category.findById(id)
    if (!categoryForChange) return res.send({ status: "error", message: "Такой категории не существует!" })

    await Category.findByIdAndUpdate(
      id,
      { $set: {
          seo: {
            title: "",
            keywords:"",
            description: "",
          }
        }
      }
    )

    res.send({
      status: "ok",
      message: "Seo cleared!"
    })

  } catch (error) {
    res.status(500).send({
      error: {
        status: "error",
        name: error.name,
        message: error.message
      }
    })
  }
};
