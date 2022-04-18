import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tariffsSchema = new Schema(
  {
    value: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    numberOfItems: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Tariffs = model('Tariffs', tariffsSchema);
