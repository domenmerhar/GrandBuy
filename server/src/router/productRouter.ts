import express from "express";
import {
  createProduct,
  deleteProduct,
  getHighestDiscount,
  getProducts,
  getSellerProducts,
  updateProduct,
} from "../controllers/productController";
import { protect, restrictTo } from "../controllers/authController";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(protect, restrictTo("seller"), createProduct);

productRouter.route("/highest-discount").get(getHighestDiscount, getProducts);

productRouter.route("/seller/:sellerId").get(getSellerProducts);

productRouter
  .route("/:productId")
  .patch(protect, restrictTo("seller"), updateProduct)
  .delete(protect, restrictTo("seller"), deleteProduct);

export default productRouter;
