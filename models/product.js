import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    translations: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    options: [{ type: String }],
    images: [{ type: String }],
    category_id: { type: Types.ObjectId, ref: 'category' },
    mainCategory: { type: Types.ObjectId, ref: 'mainCategory' },
    visible: { type: Boolean, required: true, default:true },
    unit: { type: String, required: true },
    description: { type: String, required: true },
    seo: { type: Types.ObjectId, ref: 'seo' },
    modifications: { type: Array,  default: undefined },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    shop_id: { type: Types.ObjectId, ref: 'shop' },
    quantity: { type: Number, required: true },
    oftenSearch: { type: Array,  default: undefined },
    recommended: { type: Array,  default: undefined },
  },
  {
    timestamps: true,
  }
)

export const Product = model('Product', productSchema);
