import { PendingStatus } from "../models/pendingStatus";

export const addPendingStatus = async (req, res) => {
  const { value, title, translations } = req.body
  try {
    const existingStatus = await PendingStatus.findOne({ value })
    if (existingStatus) return res.status(500).send({ status: "error", message: "Статус уже существует!" })

    const newStatus = await PendingStatus.create({
      value,
      title,
      translations,
    })

    res.status(200).send({
      status: "ok",
      message: newStatus,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message
    })
  }
};
