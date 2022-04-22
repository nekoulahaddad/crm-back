import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    images: { type: Array, required: true },
    slug: { type: String, required: true },
    visible: { type: Boolean, required: true, default: true },
    pending: { type: Boolean, required: true, default: true },
    parent_id: { type: Types.ObjectId, required: false },
    mainCategory: { type: Types.ObjectId, ref: "mainCategory", required: true },
    seo: {
      title: { type: String, required: false },
      keywords: { type: String, required: false },
      description: { type: String, required: false },
    },
    translations: {
      en: { title: { type: String, required: false } },
    },
    banners: [
      {
        image: { type: String },
        imageSize: { type: String },
        link: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Category = model("Category", categorySchema);
