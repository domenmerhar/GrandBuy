import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addOrder,
  getSellerOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter
  .route("/user")
  .get(restrictTo("user"), getUserOrders)
  .post(restrictTo("user"), addOrder)
  .patch(restrictTo("user"), updateOrderStatus);

orderRouter.route("/seller").get(restrictTo("seller"), getSellerOrders);

export default orderRouter;
