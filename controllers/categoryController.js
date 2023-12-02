import { categoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";

// add category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const alreadyExist = await categoryModel.findOne({ name });
    if (alreadyExist) {
      res
        .status(200)
        .json({ success: false, message: "Category already exists" });
    }
    const newCategory = new categoryModel(req.body);
    newCategory.save().then((data) => {
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all categories
export const categories = async (req, res) => {
  try {
    const data = await categoryModel.find();
    res
      .status(200)
      .json({ success: true, message: "Data fetched successfully", data });
  } catch (err) {
    res.status(500).json(err);
  }
};

// update category
export const updateCategory = async (req, res) => {
  try {
    const response = await categoryModel.updateOne(
      { _id: req.body.id },
      { name: req.body.name }
    );
    if (response) {
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    await productModel.delete({ category: req.params.id });
    await categoryModel.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
