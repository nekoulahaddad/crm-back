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
    await Category.create({
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
      .then(newCategory => res.send({ newCategory }))
      .catch(err => res.status(500).send({ message: err.message }))

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

export const deleteCategory = async (req, res) => {
  const { id } = req.params

  try {
    const categoryForDelete = await Category.findById(id)

    if (!categoryForDelete) return res.send({ message: "Такой категории не существует!" })

    await Category.findByIdAndRemove(id)
      .then(() => res.send({ message: "Категория удалена!" }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка!' }))

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

export const changeSeo = async (req, res) => {
  const { id } = req.params
  const { title, keywords, description } = req.body

  try {
    const categoryForChange = await Category.findById(id)
    if (!categoryForChange) return res.send({ message: "Такой категории не существует!" })

    console.log(req.body)

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

    const catForSend = await Category.findById(id)
    res.send({ category: catForSend })
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

export const clearSeo = async (req, res) => {
  const { id } = req.params

  try {
    const categoryForChange = await Category.findById(id)
    if (!categoryForChange) return res.send({ message: "Такой категории не существует!" })

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
      .then(() => res.send({ message: "Seo cleared!" }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка!' }))

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
