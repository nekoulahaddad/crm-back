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
    workingHours: {
      weekdays: { type: String, required: false },
      weekends: { type: String, required: false },
    },
    phone: { 
      value: { type: String, required: false },
      description: { type: String, required: false },
    },
    email: {
      value: { type: String, required: false },
      info: { type: String, required: false }
    },
    sectionInfo: { type: String, required: false },
    logo: { type: String, required: false },
    city: { type: Types.ObjectId, ref: "city", required: true },
    address: { type: String, required: false },
    favicon: { type: String, required: false },
    tariffs: [
      {
        tariff: {
          type: Types.ObjectId,
          ref: "tariffs",
          required: true,
        },
        date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Shop = model("Shop", shopSchema);
