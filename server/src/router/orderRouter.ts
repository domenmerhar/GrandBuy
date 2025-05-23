import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addOrder,
  confirmDelivery,
  getSellerOrders,
  getUserOrders,
  getUserOrdersCount,
  payOrder,
} from "../controllers/orderController";
import { cancelOrder, shipOrder } from "../controllers/cartController";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter
  .route("/")
  .post(
    restrictTo("user"),
    validate([
      body("cartItems")
        .isArray({ min: 1 })
        .withMessage("Please provide an array."),
    ]),
    addOrder
  );

orderRouter.route("/user").get(restrictTo("user"), getUserOrders);
orderRouter.route("/user/count").get(restrictTo("user"), getUserOrdersCount);

orderRouter.route("/user/:id/payOrder").patch(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  restrictTo("user"),
  payOrder
);

orderRouter.route("/user/:id/confirmDelivery").patch(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  restrictTo("user"),
  confirmDelivery
);

orderRouter.route("/seller").get(restrictTo("seller"), getSellerOrders);

orderRouter.use(restrictTo("seller"));

orderRouter.route("/seller/:id/ship").patch(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  shipOrder
);
orderRouter.route("/seller/:id/cancel").patch(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  cancelOrder
);
orderRouter.route("/seller/orders").get(getSellerOrders);

export default orderRouter;
