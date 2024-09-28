import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addCoupon,
  createSellerCoupon,
  deleteCoupon,
  deleteSellerCoupon,
  getCoupon,
  getCouponSeller,
  getSellerCoupons,
  updateCoupon,
  updateSellerCoupon,
} from "../controllers/couponController";
import { getAll } from "../controllers/handlerFactory";
import Coupon from "../models/couponModel";

const couponRouter = express.Router();

couponRouter.use(protect);

couponRouter
  .route("/seller")
  .post(restrictTo("seller"), createSellerCoupon)
  .get(restrictTo("seller"), getSellerCoupons);
couponRouter
  .route("/seller/:id")
  .get(restrictTo("seller"), getCouponSeller)
  .delete(restrictTo("seller"), deleteSellerCoupon)
  .patch(restrictTo("seller"), updateSellerCoupon);

couponRouter.use(restrictTo("admin"));

couponRouter.route("/").get(getAll(Coupon)).post(addCoupon);

couponRouter
  .route("/:id")
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
