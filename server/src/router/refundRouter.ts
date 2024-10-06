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
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const refundRouter = express.Router();

refundRouter.use(protect);

refundRouter.route("/seller").get(restrictTo("seller"), getSellerRefunds);

refundRouter
  .route("/product/:id")
  .post(
    validate([param("id").isMongoId(), body("reason").isString().notEmpty()]),
    restrictTo("user", "admin"),
    requestRefund
  );

refundRouter.route("/my").get(restrictTo("user", "admin"), getMyRefunds);
refundRouter
  .route("/:id")
  .get(
    validate([param("id").isMongoId()]),
    restrictTo("user", "admin"),
    getRefund
  )
  .delete(
    validate([param("id").isMongoId()]),
    restrictTo("user", "admin"),
    cancelRefund
  );

refundRouter
  .route("/:id/respond")
  .patch(
    validate([
      param("id").isMongoId(),
      body("status").isIn(["accepted", "rejected"]),
      body("resolvedMessage").isString().notEmpty(),
    ]),
    restrictTo("seller"),
    respondToRefund
  );

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
    validate([param("id").isMongoId()]),
    restrictTo("admin"),
    getOne(Refund, [
      { path: "user", select: "name email" },
      { path: "seller", select: "name email" },
      { path: "cartItemId" },
    ])
  );

export default refundRouter;
