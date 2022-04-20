import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tariffsSchema = new Schema(
  {
    value: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    translations: {
      en: {
        title: { type: String, required: false },
        description: { type: String, required: false },
      },
    },
    price: { type: String, required: true },
    numberOfItems: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Tariffs = model("Tariffs", tariffsSchema);
