import { categoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";
import multer from "multer";

//CONFIGURATION OF MULTER
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/products");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `products-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// //MULTER FILTER
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "jpg" || "jpeg" || "png" || "webp") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a image file!"), false);
//   }
// };

// //CALLING THE MULTER FUNCTION
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// const uploadProductImages = upload.array("images", 3);

// Middleware to check if the product name already exists
export const checkProductName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const productNameExist = await productModel.findOne({ name });

    if (productNameExist) {
      return res
        .status(200)
        .json({ success: false, message: "Product name already exists" });
    }

    next(); // Proceed to the next middleware (Multer)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// add product
export const addProduct = async (req, res) => {
  try {
    // uploadProductImages();
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    // Store image URLs in the database
    const images = files.map((file) => file.path);

    const { quantityAndPrice } = req.body;

    const product = new productModel({
      ...req.body,
      quantityAndPrice: JSON.parse(quantityAndPrice),
      images,
    });
    product.save().then((data) => {
      res
        .status(201)
        .json({ success: true, message: "Product created successfully", data });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    let products, categories;
    if (req.adminId) {
      products = await productModel.find().populate("category");
      categories = await categoryModel.find();
    } else {
      products = await productModel
        .find({ isDeleted: false })
        .populate("category");
      categories = await categoryModel.find({ isDeleted: false });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      products,
      categories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const response = await productModel.updateOne({ _id: productId }, req.body);
    if (response) {
      res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productModel.deleteOne({ _id: id });
    if (response) {
      res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findOne({ _id: id })
      .populate("category");
    const categories = await categoryModel.find();
    if (product) {
      res.status(200).json({ success: true, product, categories });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
