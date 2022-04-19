import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const passwordSchema = new Schema(
  {
    admin_id: { type: Types.ObjectId, ref: 'user' },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Password = model('Password', passwordSchema);
