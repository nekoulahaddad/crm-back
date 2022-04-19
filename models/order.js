import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const orderSchema = new Schema(
  {
    displayID: { type: String, required: true },
    statusOrder: { type: Types.ObjectId, ref: 'statusOrder' },
    products: [{
      product: { type: Types.ObjectId, ref: 'product' },
      price: { type: Number, required: true },
      quantity: { type: String, required: true },
    }],
    client: { type: Types.ObjectId, ref: 'user' },
    region: { type: Types.ObjectId, ref: 'region' },
    paidAt: { type: Date, required: true },
    sum: { type: Number, required: true },
    deliveredAt: { type: Date, required: true },
    deliveredPrice: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryType: { type: String, required: true },
    paymentType: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Order = model('Order', orderSchema);