import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const regionSchema = new Schema({
  name: { type: String, required: true },
  translations: {
    en: { name: { type: String, required: false } },
  },
});

export const Region = model("Region", regionSchema);
