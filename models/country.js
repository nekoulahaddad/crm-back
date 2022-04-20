import mongoose from "mongoose";
const { Schema, model } = mongoose;

const countrySchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: false },
  translations: {
    en: { name: { type: String, required: false } },
  },
});

export const Country = model("Country", countrySchema);
