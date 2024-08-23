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
    quantityAndPrice: {
      xs: {
        quantity: Number,
        price: Number,
      },
      sm: {
        quantity: Number,
        price: Number,
      },
      md: {
        quantity: Number,
        price: Number,
      },
      lg: {
        quantity: Number,
        price: Number,
      },
      xl: {
        quantity: Number,
        price: Number,
      },
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
