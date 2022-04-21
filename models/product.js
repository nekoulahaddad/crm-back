import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    translations: {
      en: {
        title: { type: String, required: false },
        description: { type: String, required: false },
      },
    },
    options: [{ type: String }],
    images: [{ type: String }],
    category_id: { type: Types.ObjectId, ref: "category" },
    mainCategory: { type: Types.ObjectId, ref: "mainCategory" },
    visible: { type: Boolean, required: true, default: true },
    unit: { type: String, required: true },
    description: { type: String, required: true },
    seo: {
      title: { type: String, required: false },
      keywords: { type: String, required: false },
      description: { type: String, required: false },
    },
    modifications: { type: Array, default: undefined },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    shop_id: { type: Types.ObjectId, ref: "shop" },
    quantity: { type: Number, required: true },
    oftenSearch: { type: Array, default: undefined },
    recommended: { type: Array, default: undefined },
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);
