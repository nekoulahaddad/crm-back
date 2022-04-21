import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    displayID: { type: String, required: true },
    birthday: { type: Date, required: false, default: null },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: {
      type: String,
      enum: ["мужской", "женской", "другой"],
      required: false,
    },
    active: { type: Boolean, required: true, default: true },
    role: { type: Types.ObjectId, ref: "role" },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    city: { type: Types.ObjectId, ref: "city" },
    shop_id: { type: Types.ObjectId, ref: "shop" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
