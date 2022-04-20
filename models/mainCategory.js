import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mainCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    visible: { type: Boolean, required: true, default: true },
    translations: {
      en: { title: { type: String, required: false } },
    },
  },
  {
    timestamps: true,
  }
);

export const MainCategory = model("MainCategory", mainCategorySchema);
