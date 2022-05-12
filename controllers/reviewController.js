import { Reviews } from "../models/reviews";

export const getReviews = async (req, res) => {
  const { limit, page } = req.query
  try {
    const reviews = await Reviews.find({}).limit(limit).skip(limit * page)
    res.send({
      status: "ok",
      message: reviews,
    })
    
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    })
  }
}

export const addReview = async (req, res) => {
  const { feedback, order_id, score } = req.body

  try {
    const newReview = await Reviews.create({ feedback, order_id, score, managerReply: " " })
    res.send({
      status: "ok",
      message: newReview,
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    })
  }
};

export const addReply = async (req, res) => {
  const { managerReply } = req.body
  const { orderId } = req.params

  try {
    await Reviews.findOneAndUpdate({order_id: orderId}, {managerReply: managerReply})
    res.send({
      status: "ok",
      message: "Ответ добавлен",
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    })
  }
}

export const editReview = async (req, res) => {
  const { feedback, score } = req.body
  const { orderId } = req.params

  try {
    await Reviews.findOneAndUpdate({order_id: orderId}, {feedback: feedback, score: score})
    res.send({
      status: "ok",
      message: "Отзыв отредактирован",
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    })
  }
}

export const deleteReview = async (req, res) => {
  const { id } = req.params

  try {
    const review = await Reviews.findById({ _id: id });

    if (!review) {
      return res.status(404).send({
        status: "error",
        message: "Отзыв не найден",
      });
    }
    await review.remove()

    res.send({
      status: "ok",
      message: "Отзыв удален",
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    })
  }
}
