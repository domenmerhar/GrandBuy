import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addCoupon,
  createSellerCoupon,
  deleteCoupon,
  expireSellerCoupon,
  getCoupon,
  getCouponSeller,
  getSellerCoupons,
  updateCoupon,
  updateSellerCoupon,
} from "../controllers/couponController";
import { getAll } from "../controllers/handlerFactory";
import Coupon from "../models/couponModel";
import { restrictPrivileges } from "../controllers/userController";

const couponRouter = express.Router();

couponRouter.use(protect);

couponRouter
  .route("/seller")
  .post(restrictTo("seller"), createSellerCoupon)
  .get(restrictTo("seller"), getSellerCoupons);
couponRouter
  .route("/seller/:id")
  .get(restrictTo("seller"), getCouponSeller)
  .delete(restrictTo("seller"), expireSellerCoupon)
  .patch(restrictTo("seller"), updateSellerCoupon);

couponRouter.use(restrictTo("admin"), restrictPrivileges("coupon"));

couponRouter.route("/").get(getAll(Coupon)).post(addCoupon);

couponRouter
  .route("/:id")
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
