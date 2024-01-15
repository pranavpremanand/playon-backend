import mongoose, { mongo } from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
      required: true,
    },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
