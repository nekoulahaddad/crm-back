import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    subDomain: { type: String, required: true },
    domain: { type: String, required: true },
    description: { type: String, required: true },
    seo: { type: Types.ObjectId, ref: 'seo' },
    mainCategory: { type: Types.ObjectId, ref: 'mainCategory' },
    displayID: { type: String, required: true },
    rating: [
      {
        client: { type: Types.ObjectId, required: true },
        score: { type: Number, required: true },
      }
    ],
    workingHours: [{ type: String, required: true }],
    phone: { type: String, required: true },
    logo: { type: String, required: true },
    region: { type: Types.ObjectId, ref: 'region', required: true },
    favicon: { type: String, required: true },
    tariffs: [{ type: Types.ObjectId, ref: 'tariffs', required: true }],
  },
  {
    timestamps: true,
  }
);

export const Shop = model('Shop', shopSchema);
