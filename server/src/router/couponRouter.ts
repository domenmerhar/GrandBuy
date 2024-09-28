import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addCoupon,
  createSellerCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "../controllers/couponController";
import { getAll } from "../controllers/handlerFactory";
import Coupon from "../models/couponModel";

const couponRouter = express.Router();

couponRouter.use(protect);

couponRouter.route("/seller").post(createSellerCoupon);
// couponRouter
//   .route("/seller/:id")
//   .delete(deleteSellerCoupon)
//   .post(updateSellerCoupon);

couponRouter.use(restrictTo("admin"));

couponRouter.route("/").get(getAll(Coupon)).post(addCoupon);

couponRouter
  .route("/:id")
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
