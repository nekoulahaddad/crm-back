import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const requisitesSchema = new Schema(
  {
    shop_id: { type: Types.ObjectId, ref: 'shop', required: true },
    INN: { type: String, required: true },
    KPP: { type: String, required: true },
    OGRN: { type: String, required: true },
    tax: { type: String, required: true },
    BIK: { type: String, required: true },
    bankName: { type: String, required: true },
    checkingAccount: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const Requisites = model('Requisites', requisitesSchema);
