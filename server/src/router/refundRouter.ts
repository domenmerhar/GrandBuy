import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  cancelRefund,
  getMyRefunds,
  getRefund,
  getSellerRefunds,
  requestRefund,
  respondToRefund,
} from "../controllers/refundController";
import { getAll, getOne } from "../controllers/handlerFactory";
import Refund from "../models/refundModel";

const refundRouter = express.Router();

refundRouter.use(protect);

refundRouter.route("/seller").get(restrictTo("seller"), getSellerRefunds);

refundRouter
  .route("/product/:id")
  .post(restrictTo("user", "admin"), requestRefund);

refundRouter.route("/my").get(restrictTo("user", "admin"), getMyRefunds);
refundRouter
  .route("/:id")
  .get(restrictTo("user", "admin"), getRefund)
  .delete(restrictTo("user", "admin"), cancelRefund);

refundRouter.route("/:id/respond").patch(restrictTo("seller"), respondToRefund);

refundRouter
  .route("/")
  .get(
    restrictTo("admin"),
    getAll(Refund, [
      { path: "user", select: "name email" },
      { path: "seller", select: "name email" },
      { path: "cartItemId" },
    ])
  );
refundRouter
  .route("/admin/:id")
  .get(
    restrictTo("admin"),
    getOne(Refund, [
      { path: "user", select: "name email" },
      { path: "seller", select: "name email" },
      { path: "cartItemId" },
    ])
  );

export default refundRouter;
