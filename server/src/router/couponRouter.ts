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
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const couponRouter = express.Router();

couponRouter.use(protect);

couponRouter
  .route("/seller")
  .post(
    validate([
      body("code").notEmpty(),
      body("products").isArray(),
      body("discount").isInt({ min: 1, max: 100 }),
      body("expireAt").isDate(),
    ]),
    restrictTo("seller"),
    createSellerCoupon
  )
  .get(restrictTo("seller"), getSellerCoupons);

couponRouter
  .route("/seller/:id")
  .get(
    validate([param("id").isMongoId()]),
    restrictTo("seller"),
    getCouponSeller
  )
  .delete(
    validate([param("id").isMongoId()]),
    restrictTo("seller"),
    expireSellerCoupon
  )
  .patch(
    validate([param("id").isMongoId()]),
    restrictTo("seller"),
    updateSellerCoupon
  );

couponRouter.use(restrictTo("admin"), restrictPrivileges("coupon"));

couponRouter.route("/").get(getAll(Coupon)).post(addCoupon);

couponRouter
  .route("/:id")
  .get(validate([param("id").isMongoId()]), getCoupon)
  .patch(
    validate([
      param("id").isMongoId(),
      body("products").isArray().optional(),
      body("expireAt").isDate().optional(),
      body("discount").isInt({ min: 1, max: 100 }).optional(),
    ]),
    updateCoupon
  )
  .delete(validate([param("id").isMongoId()]), deleteCoupon);

export default couponRouter;
