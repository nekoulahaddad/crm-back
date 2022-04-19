import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema(
  {
    value: { type: String, required: true }
  }
);

export const Role = model('Role', roleSchema);
