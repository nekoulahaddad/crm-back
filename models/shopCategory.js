import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const shopCategorySchema = new Schema(
  {
    category: [{ type: Types.ObjectId, ref: 'category' }],
    shop: { type: Types.ObjectId, ref: 'shop' }
  },
  {
    timestamps: true,
  }
);

export const ShopCategory = model('ShopCategory', shopCategorySchema);
