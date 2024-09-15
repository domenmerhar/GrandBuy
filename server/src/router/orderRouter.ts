import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addOrder,
  confirmDelivery,
  getSellerOrders,
  getUserOrders,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter
  .route("/user")
  .get(restrictTo("user"), getUserOrders)
  .post(restrictTo("user"), addOrder);

orderRouter
  .route("/user/:id/confirmDelivery")
  .patch(restrictTo("user"), confirmDelivery);

orderRouter.route("/seller").get(restrictTo("seller"), getSellerOrders);

export default orderRouter;
