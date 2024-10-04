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
// // refundRouter.route("/:id/accept").post(restrictTo("seller"), acceptRefund);
// // refundRouter.route("/:id/cancel").post(restrictTo("seller"), acceptRefund);

// refundRouter.route("/").get(restrictTo("admin"), getAllRefunds);
// refundRouter.route("/:id").get(restrictTo("admin"), getAllRefunds);

export default refundRouter;