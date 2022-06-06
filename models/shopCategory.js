import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const shopCategorySchema = new Schema(
  {
    category: [{ type: Types.ObjectId, ref: "category" }],
    shop: { type: Types.ObjectId, ref: "shop" },
    visible: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

export const ShopCategory = model("ShopCategory", shopCategorySchema);
