import { StatusOrder } from "../models/statusOrder";

export const addStatus = async (req, res) => {
  const { value, title, translations } = req.body
  try {
    const existingStatus = await StatusOrder.findOne({ value })
    if (existingStatus) return res.status(500)({ message: "Статус уже существует!" })

    const newStatus = await StatusOrder.create({
      value,
      title,
      translations,
    })

    res.status(200).send({
      status: "ok",
      data: newStatus,
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
