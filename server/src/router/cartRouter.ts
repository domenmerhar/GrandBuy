import express from "express";
import { protect } from "../controllers/authController";
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  updateItemQuantity,
} from "../controllers/cartController";
import { applyCoupon } from "../controllers/couponController";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.route("/").get(getCartItems).post(createCartItem);

cartRouter.route("/:cartId").patch(updateItemQuantity).delete(deleteCartItem);

cartRouter.route("/apply-coupon/:couponCode").patch(protect, applyCoupon);

export default cartRouter;
