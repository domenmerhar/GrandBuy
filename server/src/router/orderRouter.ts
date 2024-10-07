import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addOrder,
  confirmDelivery,
  getSellerOrders,
  getUserOrders,
} from "../controllers/orderController";
import { cancelOrder, shipOrder } from "../controllers/cartController";
import { validate } from "../utils/validate";
import { param } from "express-validator";

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter.route("/").post(restrictTo("user"), addOrder);

orderRouter.route("/user").get(restrictTo("user"), getUserOrders);

orderRouter
  .route("/user/:id/confirmDelivery")
  .patch(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
    restrictTo("user"),
    confirmDelivery
  );

orderRouter.route("/seller").get(restrictTo("seller"), getSellerOrders);

orderRouter.use(restrictTo("seller"));

orderRouter
  .route("/seller/:id/ship")
  .patch(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
    shipOrder
  );
orderRouter
  .route("/seller/:id/cancel")
  .patch(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
    cancelOrder
  );
orderRouter.route("/seller/orders").get(getSellerOrders);

export default orderRouter;
