import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const questionAnswerSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    shop_id: { type: Types.ObjectId, ref: "shop" },
    translations: {
      en: {
        question: { type: String, required: false },
        answer: { type: String, required: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const QuestionAnswer = model("QuestionAnswer", questionAnswerSchema);
