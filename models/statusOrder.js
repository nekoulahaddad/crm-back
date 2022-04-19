import mongoose from "mongoose";
const { Schema, model } = mongoose;

const statusOrderSchema = new Schema(
  {
    value: { type: String, required: true },
    translations: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const StatusOrder = model('StatusOrder', statusOrderSchema);
