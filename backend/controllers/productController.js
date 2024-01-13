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
    //if success
    // Everything went fine.
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(fileLocation);
};

// @desc    Get top rated product
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ numReviews: -1 }).limit(3);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});


// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;
  const product = await Product.findById(id);
  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product is already reviewed.")
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      comment,
      rating: Number(rating)
    }
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ Message: "Review has been added." })
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
});

// @desc    Update review numbers.
// @route   GET /api/products/reviews
// @access  Private
export const updateProductReviews = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    products.forEach(async product =>{
      product.numReviews = product.reviews.length;
      const rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
      product.rating = rating?rating:0;
      console.log("first")
      await product.save();
      // res.json(product)
    })

    res.status(201).send({ Message: "Number review updated ." })
  } else {
    res.status(404).send({ message: "Resource not found" });
  }
});