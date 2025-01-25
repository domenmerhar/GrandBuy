import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createCartItem,
  decrementCartItem,
  deleteCartItem,
  getCartItemCount,
  getCartItems,
  getCartItemsSummary,
  getRecentRevenueForSeller,
  getSellerRecent5,
  incrementCartItem,
  redeemCouponOnCartItems,
  updateItemQuantity,
} from "../controllers/cartController";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.route("/").get(getCartItems);
cartRouter.route("/count").get(getCartItemCount);
cartRouter.route("/summary/:cartItems").get(getCartItemsSummary);

cartRouter
  .route("/add/:productId")
  .post(
    validate([
      body("quantity")
        .isNumeric()
        .withMessage("Please provide a valid quantity.")
        .notEmpty()
        .withMessage("Please provide a quantity."),

      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID.")
        .notEmpty()
        .withMessage("Please provide a product ID."),
    ]),
    createCartItem
  );

cartRouter
  .route("/increment/:cartItemId")
  .patch(
    validate([
      param("cartItemId")
        .isMongoId()
        .withMessage("Please provide a valid cart item ID.")
        .notEmpty()
        .withMessage("Please provide a cart item ID."),
    ]),
    incrementCartItem
  );

cartRouter
  .route("/decrement/:cartItemId")
  .patch(
    validate([
      param("cartItemId")
        .isMongoId()
        .withMessage("Please provide a valid cart item ID.")
        .notEmpty()
        .withMessage("Please provide a cart item ID."),
    ]),
    decrementCartItem
  );

cartRouter
  .route("/:cartItemId")
  .patch(
    validate([
      param("cartItemId")
        .isMongoId()
        .withMessage("Please provide a valid cart ID.")
        .notEmpty()
        .withMessage("Please provide a cart ID."),

      body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 1.")
        .notEmpty()
        .withMessage("Please provide a quantity.")
        .isInt({ min: 1 })
        .withMessage("Please provide quantity that is greater than 1."),
    ]),

    updateItemQuantity
  )
  .delete(
    validate([
      param("cartItemId")
        .isMongoId()
        .withMessage("Please provide a cart valid ID.")
        .notEmpty()
        .withMessage("Please provide a cart ID."),
    ]),

    deleteCartItem
  );

cartRouter.route("/apply-coupon/:couponCode").patch(
  validate([
    param("couponCode")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a couponCode."),
  ]),

  protect,
  redeemCouponOnCartItems
);

cartRouter.route("/seller/revenue/:days").get(
  validate([
    body("days")
      .isInt({ min: 1 })
      .withMessage("Please days that are greater than 1.")
      .notEmpty()
      .withMessage("Please provide a days."),
  ]),

  restrictTo("seller"),
  getRecentRevenueForSeller
);

cartRouter
  .route("/seller/recent-5")
  .get(restrictTo("seller"), getSellerRecent5);

export default cartRouter;
