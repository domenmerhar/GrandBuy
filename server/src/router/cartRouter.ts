import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  getRecentRevenueForSeller,
  getSellerRecent5,
  redeemCouponOnCartItems,
  updateItemQuantity,
} from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.route("/").get(getCartItems);
cartRouter.route("/add/:productId").post(createCartItem);

cartRouter.route("/:cartId").patch(updateItemQuantity).delete(deleteCartItem);

cartRouter
  .route("/apply-coupon/:couponCode")
  .patch(protect, redeemCouponOnCartItems);

cartRouter
  .route("/seller/revenue/:days")
  .get(restrictTo("seller"), getRecentRevenueForSeller);

cartRouter
  .route("/seller/recent-5")
  .get(restrictTo("seller"), getSellerRecent5);

export default cartRouter;
