import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const citySchema = new Schema({
    name: { type: String, required: true },
    translations: {
      ru: { type: String },
      en: { type: String },
    },
    country_id: { type: Types.ObjectId, ref: 'country' }
  });

export const City = model('City', citySchema);
