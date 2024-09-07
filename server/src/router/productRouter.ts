import express from "express";
import {
  createProduct,
  deleteProduct,
  getHighestDiscount,
  getProduct,
  getProducts,
  getSellerProducts,
  updateProduct,
} from "../controllers/productController";
import {
  protect,
  restrictTo,
  saveUserToResponse,
} from "../controllers/authController";
import { addToHistory } from "../controllers/historyItemController";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(protect, restrictTo("seller"), createProduct);

productRouter.route("/highest-discount").get(getHighestDiscount);

productRouter.route("/seller/:sellerId").get(getSellerProducts);

productRouter
  .route("/:productId")
  .get(saveUserToResponse, addToHistory, getProduct);

productRouter
  .route("/:productId")
  .patch(protect, restrictTo("seller"), updateProduct)
  .delete(protect, restrictTo("seller"), deleteProduct);

export default productRouter;
