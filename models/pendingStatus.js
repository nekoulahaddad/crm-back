import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pendingStatusSchema = new Schema(
  {
    value: { type: String, required: true },
    title: { type: String, required: true },
    translations: {
      en: {
        title: { type: String, required: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const PendingStatus = model("PendingStatus", pendingStatusSchema);
