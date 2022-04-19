import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mainCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    visible: { type: Boolean, required: true, default:true },
    translations: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const MainCategory = model('MainCategory', mainCategorySchema)
