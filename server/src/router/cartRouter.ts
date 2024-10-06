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
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.route("/").get(getCartItems);
cartRouter
  .route("/add/:productId")
  .post(
    validate([
      body("quantity").isNumeric().notEmpty(),
      param("productId").isMongoId().notEmpty(),
    ]),
    createCartItem
  );

cartRouter
  .route("/:cartId")
  .patch(
    validate([
      param("cartId").isMongoId().notEmpty(),
      body("quantity").isNumeric().notEmpty().isInt({ min: 1 }),
    ]),
    updateItemQuantity
  )
  .delete(validate([param("cartId").isMongoId().notEmpty()]), deleteCartItem);

cartRouter
  .route("/apply-coupon/:couponCode")
  .patch(
    validate([param("couponCode").isMongoId().notEmpty()]),
    protect,
    redeemCouponOnCartItems
  );

cartRouter
  .route("/seller/revenue/:days")
  .get(
    validate([body("days").isInt({ min: 1 })]),
    restrictTo("seller"),
    getRecentRevenueForSeller
  );

cartRouter
  .route("/seller/recent-5")
  .get(restrictTo("seller"), getSellerRecent5);

export default cartRouter;
