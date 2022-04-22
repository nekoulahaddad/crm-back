import { QuestionAnswer } from "../models/questionAnswer";

export const addQuestion = async (req, res) => {
  const { question, answer, shop_id, translations } = req.body

  try {
    const newQuestion = await QuestionAnswer.create({ question, answer, shop_id, translations })
    res.send({
      status: "ok",
      data: newQuestion,
    })
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
