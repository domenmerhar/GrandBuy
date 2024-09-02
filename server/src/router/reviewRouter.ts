import express, { NextFunction, Request, Response } from "express";
import { protect } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  getMyReviews,
  getProductReviews,
  getReview,
  getReviews,
  getUserReviews,
  updateReview,
} from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.route("/").get(getReviews);

reviewRouter
  .route("/product/:productId")
  .get(getProductReviews)
  .post(protect, createReview);

reviewRouter.route("/user/:userId").get(getUserReviews);

reviewRouter.route("/me").get(protect, getMyReviews);

reviewRouter
  .route("/:reviewId")
  .get(getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

export default reviewRouter;
