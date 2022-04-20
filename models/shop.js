import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    subDomain: { type: String, required: false, unique: true },
    domain: { type: String, required: false },
    description: { type: String, required: true },
    seo: {
      title: { type: String, required: false },
      keywords: { type: String, required: false },
      description: { type: String, required: false },
    },
    mainCategory: { type: Types.ObjectId, ref: "mainCategory" },
    translations: {
      en: {
        name: { type: String, required: false },
        description: { type: String, required: false },
      },
    },
    displayID: { type: String, required: true },
    rating: [
      {
        client: { type: Types.ObjectId, required: true },
        score: { type: Number, required: true },
      },
    ],
    workingHours: [{ type: String, required: true }],
    phone: { type: String, required: true },
    logo: { type: String, required: true },
    region: { type: Types.ObjectId, ref: "region", required: true },
    favicon: { type: String, required: true },
    tariffs: [{ type: Types.ObjectId, ref: "tariffs", required: true }],
  },
  {
    timestamps: true,
  }
);

export const Shop = model("Shop", shopSchema);
