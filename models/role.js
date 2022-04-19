import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  value: { type: String, required: true, unique: true },
  translations: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
});

export const Role = model("Role", roleSchema);
