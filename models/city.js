import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const citySchema = new Schema({
  name: { type: String, required: true },
  translations: {
    en: { name: { type: String, required: false } },
  },
  country_id: { type: Types.ObjectId, ref: "country" },
});

export const City = model("City", citySchema);
