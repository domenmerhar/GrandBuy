import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addCoupon,
  createSellerCoupon,
  deleteCoupon,
  getCoupon,
  getCouponSeller,
  updateCoupon,
} from "../controllers/couponController";
import { getAll } from "../controllers/handlerFactory";
import Coupon from "../models/couponModel";

const couponRouter = express.Router();

couponRouter.use(protect);

couponRouter.route("/seller").post(restrictTo("seller"), createSellerCoupon);
couponRouter.route("/seller/:id").get(restrictTo("seller"), getCouponSeller); //.delete(deletesellercoupon);
//   .post(updateSellerCoupon);

couponRouter.use(restrictTo("admin"));

couponRouter.route("/").get(getAll(Coupon)).post(addCoupon);

couponRouter
  .route("/:id")
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
