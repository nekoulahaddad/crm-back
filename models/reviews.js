import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const reviewsSchema = new Schema(
  {
    order_id: { type: Types.ObjectId, ref: 'Order', required: true },
    feedback: { type: String, required: true },
    managerReply: { type: String, required: true },
    score: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    status_id: { type: Types.ObjectId, ref: 'PendingStatus', required: true },
    shop_id: { type: Types.ObjectId, ref: 'Shop', required: true },
  },
  {
    timestamps: true,
  }
);

export const Reviews = model("Review", reviewsSchema);
