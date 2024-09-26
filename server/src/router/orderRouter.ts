import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addOrder,
  confirmDelivery,
  getSellerOrders,
  getUserOrders,
} from "../controllers/orderController";
import { cancelOrder, shipOrder } from "../controllers/cartController";

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter.route("/").post(restrictTo("user"), addOrder);

orderRouter.route("/user").get(restrictTo("user"), getUserOrders);

orderRouter
  .route("/user/:id/confirmDelivery")
  .patch(restrictTo("user"), confirmDelivery);

orderRouter.route("/seller").get(restrictTo("seller"), getSellerOrders);

orderRouter.use(restrictTo("seller"));

orderRouter.route("/seller/:id/ship").patch(shipOrder);
orderRouter.route("/seller/:id/cancel").patch(cancelOrder);
orderRouter.route("/seller/orders").get(getSellerOrders);

export default orderRouter;
