import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: false, default: null },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: Boolean, required: false },
    active: { type: Boolean, required: true, default: true },
    roles: { type: Array, required: false, default: ["user"] },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    region: { type: Types.ObjectId },
    shop_id: { type: Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("Admin", userSchema);
