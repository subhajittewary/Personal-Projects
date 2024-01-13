import express from "express";
import {
  getProducts,
  getProductById,
  getProductBySearchItem,
  updateProductById,
  createProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
  updateProductReviews
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/top").get(getTopProducts);
router.route("/reviews/update").get(updateProductReviews);

router.route("/add").post(protect, isAdmin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, updateProductById)
  .delete(protect, isAdmin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

router.route("/search/:productName").get(getProductBySearchItem);

export default router;
