import express, { NextFunction, Request, Response } from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  dislikeReview,
  getMyReviews,
  getProductReviews,
  getUserReviews,
  likeReview,
  updateReview,
} from "../controllers/reviewController";
import { getAll, getOne } from "../controllers/handlerFactory";
import Review from "../models/reviewModel";

const reviewRouter = express.Router();

reviewRouter.route("/").get(getAll(Review));

reviewRouter
  .route("/product/:productId")
  .get(getProductReviews)
  .post(protect, restrictTo("user"), createReview);

reviewRouter.route("/user/:userId").get(getUserReviews);

reviewRouter.route("/me").get(protect, getMyReviews);

reviewRouter
  .route("/:id")
  .get(
    getOne(Review, [
      { path: "userId", select: "username -_id" },
      { path: "productId", select: "name -_id" },
    ])
  )
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

reviewRouter.use(protect, restrictTo("user"));
reviewRouter.route("/:id/like").patch(likeReview);
reviewRouter.route("/:id/dislike").patch(dislikeReview);

export default reviewRouter;
