import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  cancelRefund,
  getMyRefunds,
  getRefund,
  requestRefund,
} from "../controllers/refundController";

const refundRouter = express.Router();

refundRouter.use(protect);

refundRouter
  .route("/product/:id")
  .post(restrictTo("user", "admin"), requestRefund);

refundRouter.route("/my").get(restrictTo("user", "admin"), getMyRefunds);
refundRouter
  .route("/:id")
  .get(restrictTo("user", "admin"), getRefund)
  .delete(restrictTo("user", "admin"), cancelRefund);

// refundRouter.route("/:id/respond").post(restrictTo("seller"), respondRefund);
// // refundRouter.route("/:id/accept").post(restrictTo("seller"), acceptRefund);
// // refundRouter.route("/:id/cancel").post(restrictTo("seller"), acceptRefund);

// refundRouter.route("/seller").get(restrictTo("seller"), getSellerRefunds);

// refundRouter.route("/").get(restrictTo("admin"), getAllRefunds);
// refundRouter.route("/:id").get(restrictTo("admin"), getAllRefunds);

export default refundRouter;
