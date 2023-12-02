import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const categoryModel = mongoose.model("category", categorySchema);