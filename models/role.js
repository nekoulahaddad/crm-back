import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  value: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  translations: {
    en: { title: { type: String, required: false } },
  },
});

export const Role = model("Role", roleSchema);
