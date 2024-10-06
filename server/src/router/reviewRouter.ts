import express, { NextFunction, Request, Response } from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  deleteReviewUser,
  dislikeReview,
  getMyReviews,
  getProductReviews,
  getProductReviewStats,
  getRecent5,
  getRecentReviewsForSeller,
  getUserReviews,
  likeReview,
  updateReview,
} from "../controllers/reviewController";
import { getAll, getOne } from "../controllers/handlerFactory";
import Review from "../models/reviewModel";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const reviewRouter = express.Router();

reviewRouter.route("/").get(getAll(Review));

reviewRouter
  .route("/product/:productId")
  .get(getProductReviews)
  .post(
    validate([
      param("productId").isMongoId().notEmpty(),
      body("rating").isInt({ min: 1, max: 5 }).notEmpty(),
      body("review").isString().notEmpty().isLength({ min: 1, max: 500 }),
    ]),
    protect,
    restrictTo("user"),
    createReview
  );

reviewRouter
  .route("/product/:productId/stats")
  .get(
    validate([param("productId").isMongoId().notEmpty()]),
    getProductReviewStats
  );

reviewRouter
  .route("/user/:userId")
  .get(validate([param("userId").isMongoId().notEmpty()]), getUserReviews);

reviewRouter.route("/me").get(protect, getMyReviews);

reviewRouter
  .route("/:id")
  .get(
    validate([param("id").isMongoId().notEmpty()]),
    getOne(Review, [
      { path: "user", select: "username -_id" },
      { path: "product", select: "name -_id" },
    ])
  )
  .patch(
    validate([
      param("id").isMongoId().notEmpty(),
      body("rating").isInt({ min: 1, max: 5 }).optional(),
      body("review").isString().optional(),
    ]),
    protect,
    updateReview
  )
  .delete(
    validate([param("id").isMongoId().notEmpty()]),
    protect,
    restrictTo("user"),
    deleteReviewUser
  );

reviewRouter.use(protect);

reviewRouter
  .route("/admin/:id")
  .delete(
    validate([param("id").isMongoId().notEmpty()]),
    restrictTo("admin"),
    deleteReview
  );

reviewRouter.route("/seller/recent-5").get(restrictTo("seller"), getRecent5);

reviewRouter
  .route("/seller/:days")
  .get(
    validate([param("days").isInt({ min: 1 })]),
    restrictTo("seller"),
    getRecentReviewsForSeller
  );

reviewRouter.use(restrictTo("user"));
reviewRouter
  .route("/:id/like")
  .patch(validate([param("id").isMongoId().notEmpty()]), likeReview);
reviewRouter
  .route("/:id/dislike")
  .patch(validate([param("id").isMongoId().notEmpty()]), dislikeReview);

export default reviewRouter;
