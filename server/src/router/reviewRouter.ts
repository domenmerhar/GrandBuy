import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  deleteReviewUser,
  dislikeReview,
  getAverageRatingSeller,
  getMyReviews,
  getProductReviews,
  getProductReviewStats,
  getRecent5,
  getRecentReviewsForSeller,
  getSellerReviews,
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
      param("productId")
        .isMongoId()
        .withMessage("Please provide a product ID.")
        .notEmpty()
        .withMessage("Please provide a product ID."),

      body("rating")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be greater than 1 and lower than 5.")
        .notEmpty()
        .withMessage("Please provide a rating."),

      body("review")
        .trim()
        .escape()
        .isString()
        .withMessage("Please provide a valid reivew.")
        .notEmpty()
        .withMessage("Please provide a review.")
        .isLength({ min: 1, max: 500 })
        .withMessage("Review must be between 1 and 500 characters long."),
    ]),

    protect,
    restrictTo("user"),
    createReview
  );

reviewRouter.route("/product/:productId/stats").get(
  validate([
    param("productId")
      .isMongoId()
      .withMessage("Please provide a valid product ID.")
      .notEmpty()
      .withMessage("Please provide a product ID."),
  ]),

  getProductReviewStats
);

reviewRouter
  .route("/user/:userId")
  .get(
    validate([
      param("userId")
        .isMongoId()
        .withMessage("Please provide a valid user ID.")
        .notEmpty()
        .withMessage("Please provide a user ID."),
    ]),
    getUserReviews
  );

reviewRouter.route("/me").get(protect, getMyReviews);

reviewRouter
  .route("/seller")
  .get(protect, restrictTo("seller"), getSellerReviews);

reviewRouter
  .route("/seller/average-rating")
  .get(protect, restrictTo("seller"), getAverageRatingSeller);

reviewRouter
  .route("/:id")
  .get(
    validate([
      param("id")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide an ID."),
    ]),
    getOne(Review, [
      { path: "user", select: "username -_id" },
      { path: "product", select: "name -_id" },
    ])
  )
  .patch(
    validate([
      param("id")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide an ID."),
      body("rating")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be greater than 1 and lower than 5")
        .optional(),
      body("review")
        .isString()
        .withMessage("Please provide a review.")
        .optional(),
    ]),
    protect,
    updateReview
  )
  .delete(
    validate([
      param("id")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide an ID."),
    ]),
    protect,
    restrictTo("user"),
    deleteReviewUser
  );

reviewRouter.use(protect);

reviewRouter.route("/admin/:id").delete(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  restrictTo("admin"),
  deleteReview
);

reviewRouter.route("/seller/recent-5").get(restrictTo("seller"), getRecent5);

reviewRouter.route("/seller/:days").get(
  validate([
    param("days")
      .isFloat({ min: 1 })
      .withMessage("Days must be at least 1.")
      .optional(),
  ]),

  restrictTo("seller"),
  getRecentReviewsForSeller
);

reviewRouter.use(restrictTo("user", "seller"));
reviewRouter.route("/:id/like").patch(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  likeReview
);
reviewRouter.route("/:id/dislike").patch(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  dislikeReview
);

export default reviewRouter;
