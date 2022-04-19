import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const regionSchema = new Schema(
  {
    country_id: { type: Types.ObjectId, ref: 'country' },
    city_id: { type: Types.ObjectId, ref: 'city' },
    address: { type: String, required: true }
  }
);

export const Region = model('Region', regionSchema);
