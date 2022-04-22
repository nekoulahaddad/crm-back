import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const reviewsSchema = new Schema(
  {
    order_id: { type: Types.ObjectId, ref: 'order', required: true },
    feedback: { type: String, required: true },
    managerReply: { type: String, required: true },
    score: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

export const Reviews = model("Review", reviewsSchema);
