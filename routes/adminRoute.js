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
import {
  adminLogin,
  changeUserBlockStatus,
  getAllUsers,
} from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";
const router = express.Router();

// admin login
router.post("/login", adminLogin);

// get all categories
router.get("/categories", categories);

// create category
router.post("/add-category", adminAuth, addCategory);

// update category
router.post("/update-category",adminAuth, updateCategory);

// delete category
router.delete("/delete-category/:id",adminAuth, deleteCategory);

// get all products
router.get("/products", getAllProducts);

// add product
router.post("/add-product",adminAuth, addProduct);

// update product
router.patch("/update-product",adminAuth, updateProduct);

// delete product
router.delete("/delete-product",adminAuth, deleteProduct);

// get all users
router.get("/get-users", getAllUsers);

// change user block status
router.post("/change-user-status",adminAuth, changeUserBlockStatus);

export default router;
