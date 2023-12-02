import { productModel } from "../models/productModel.js";
import multer from "multer";

//CONFIGURATION OF MULTER
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `products-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

//MULTER FILTER
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpg" || "jpeg" || "png" || "webp") {
    cb(null, true);
  } else {
    cb(new Error("Not a image file!"), false);
  }
};

//CALLING THE MULTER FUNCTION
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProductImages = upload.array("images", 3);

// add product
export const addProduct = async (req, res) => {
  try {
    const { name } = req.body;
    uploadProductImages();
    const imgs = req.files;
    let images = imgs.map((value) => value.filename);
    req.body.images = images;

    const productNameExist = await productModel.findOne({ name });
    if (productNameExist) {
      res
        .status(200)
        .json({ success: false, message: "Product name already exists" });
    }
    const product = new productModel(req.body);
    product.save().then((data) => {
      res
        .status(201)
        .json({ success: true, message: "Product created successfully", data });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find();
    res
      .status(200)
      .json({ success: true, message: "Data fetched successfully", data });
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
};
