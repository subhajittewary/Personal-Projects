import express from "express";
import {
  getProducts,
  getProductById,
  getProductBySearchItem,
  updateProductById,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/add").post(protect, isAdmin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, updateProductById)
  .delete(protect, isAdmin, deleteProduct);

router.route("/search/:productName").get(getProductBySearchItem);

export default router;
