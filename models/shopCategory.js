import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const shopCategorySchema = new Schema(
  {
    category: { type: Types.ObjectId, ref: "Category" },
    shop: { type: Types.ObjectId, ref: "Shop" },
    visible: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

export const ShopCategory = model("ShopCategory", shopCategorySchema);
