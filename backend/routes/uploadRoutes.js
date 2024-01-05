import express from "express";
import { uploadFile } from "../controllers/productController.js";
import { upload } from "../helpers/uploadHelper.js";

const router = express.Router();

router.post("/", upload, uploadFile);

export default router;
