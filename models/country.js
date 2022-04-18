import mongoose from "mongoose";
const { Schema, model } = mongoose;

const countrySchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    translations: {
      ru: { type: String },
      en: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Country = model('Country', countrySchema);
