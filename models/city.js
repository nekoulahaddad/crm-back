import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const citySchema = new Schema({
  name: { type: String, required: true },
  coords: {
    lat: { type: String, required: false },
    lon: { type: String, required: false },
  },
  translations: {
    en: { name: { type: String, required: false } },
  },
  country_id: { type: Types.ObjectId, ref: "country" },
  region_id: { type: Types.ObjectId, ref: "Region" },
});

export const City = model("City", citySchema);
