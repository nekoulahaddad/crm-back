import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customIDSchema = new Schema(
  {
    name: { type: String, required: true },
    count: { type: String, required: true }
  }
);

export const CustomID = new model('CustomID', customIDSchema);
