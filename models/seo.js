import mongoose from "mongoose";
const { Schema, model } = mongoose;

const seoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String, required: true }]
  }
);

export const Seo = model('Seo', seoSchema);
