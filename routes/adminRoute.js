import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import {
  addCategory,
  categories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

// admin login


// get all categories
router.get("/categories", categories);

// create category
router.post("/add-category", addCategory);

// update category
router.post("/update-category", updateCategory);

// delete category
router.post("/delete-category/:id", deleteCategory);

// get all products
router.get("/products", getAllProducts);

// add product
router.post("/add-product", addProduct);

// update product
router.patch("/update-product", updateProduct);

// delete product
router.delete("/delete-product", deleteProduct);

export default router;
