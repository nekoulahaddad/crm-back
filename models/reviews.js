import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const reviewsSchema = new Schema(
  {
    order_id: { type: Types.ObjectId, ref: 'order', required: true },
    feedback: { type: String, required: true },
    managerReply: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Reviews = model('', reviewsSchema);
