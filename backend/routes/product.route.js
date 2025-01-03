import express from "express";
import upload from "../middleware/multer.js";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createProduct
);
router.delete("/:id/remove", deleteProduct);
router.get("/:id/single", getProduct);
router.get("/list", getProducts);

export default router;
