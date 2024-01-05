import express from "express";
import asyncHandler from "express-async-handler";
import { upload } from "../helpers/uploadHelper.js";
import Product from "../models/productModel.js";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch product by search item
// @route   POST /api/products/search
// @access  Public
export const getProductBySearchItem = asyncHandler(async (req, res) => {
  const productName = req.params.productName;
  let product;
  if (productName) {
    product = await Product.find({
      name: { $regex: productName },
    });
  } else {
    product = await Product.find({});
  }

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.price = req.body.price || product.price;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    create product
// @route   POST /api/products/add
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  console.log(req.user);
  const product = new Product({
    user: req.user._id,
    name: "Sample Product",
    image: "images/camera.jpg",
    brand: "Sample Brand",
    price: 0,
    countInStock: 0,
    description: "Sample Description",
    category: "Sample Category",
  });

  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not created");
  }
});

// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById({ _id: productId });
  if (product) {
    const deletedProduct = await product.remove();
    if (deletedProduct) {
      res.json({ message: "Product removed successfully" });
    } else {
      res.status(404);
      throw new Error("Product not removed");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const uploadFile = (req, res) => {
  const fileLocation = `/${req.file.path}`;
  upload(req, res, function (err) {
    //if error
    //any error operations
    console.log("first");
    //if success
    // Everything went fine.
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(fileLocation);
};
