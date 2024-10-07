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
      body("code").notEmpty().withMessage("Please provide a code."),
      body("products")
        .isArray()
        .withMessage("Products must be an array.")
        .notEmpty()
        .withMessage("Please provide products."),
      body("discount")
        .isInt({ min: 1, max: 100 })
        .withMessage("Please provide a valid discount.")
        .notEmpty()
        .withMessage("Please provide a discount."),
      body("expireAt")
        .isDate()
        .withMessage("Please provide a valid expireAt.")
        .notEmpty()
        .withMessage("Please provide a expireAt."),
    ]),
    restrictTo("seller"),
    createSellerCoupon
  )
  .get(restrictTo("seller"), getSellerCoupons);

couponRouter
  .route("/seller/:id")
  .get(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
    restrictTo("seller"),
    getCouponSeller
  )
  .delete(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
    restrictTo("seller"),
    expireSellerCoupon
  )
  .patch(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
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
      param("id").isMongoId().withMessage("Please provide a valid ID."),
      body("products")
        .isArray()
        .withMessage("Products must be an array.")
        .optional(),
      body("expireAt")
        .isDate()
        .withMessage("Please provide a valid expireAt.")
        .optional(),
      body("discount")
        .isInt({ min: 1, max: 100 })
        .withMessage("Please provide a discount.")
        .optional(),
    ]),
    updateCoupon
  )
  .delete(
    validate([
      param("id").isMongoId().withMessage("Please provide a valid ID."),
    ]),
    deleteCoupon
  );

export default couponRouter;
