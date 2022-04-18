import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    images: { type: String, required: true },
    slug: { type: String, required: true },
    visible: { type: String, required: true },
    parent_id: { type: Types.ObjectId, required: true },
    seo: { type: Types.ObjectId, ref: 'seo' },
    banners: [{
      image: { type: String },
      imageSize: { type: String },
      link: { type: String },
    }]
  },
  {
    timestamps: true,
  }
);

export const Category = model('Category', categorySchema);
