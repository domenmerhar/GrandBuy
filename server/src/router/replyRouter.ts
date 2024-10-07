import express from "express";
import { protect } from "../controllers/authController";
import {
  createReply,
  deleteReply,
  getReply,
  getReviewReplies,
  getUserReplies,
} from "../controllers/replyController";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const replyRouter = express.Router();

replyRouter
  .route("/:id")
  .get(
    validate([
      param("id")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide an ID."),
    ]),

    getReply
  )
  .delete(protect, deleteReply);

replyRouter
  .route("/review/:reviewId")
  .get(
    validate([
      param("reviewId")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide a review ID."),
    ]),

    getReviewReplies
  )
  .post(
    validate([
      param("reviewId")
        .isMongoId()
        .withMessage("Please provide a valid review ID.")
        .notEmpty()
        .withMessage("Please provide a review ID."),

      body("reply")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("Please provide a reply."),
    ]),

    protect,
    createReply
  );

replyRouter.route("/user/:userId").get(
  validate([
    param("userId")
      .isMongoId()
      .withMessage("Please provide a valid user ID.")
      .notEmpty()
      .withMessage("Please provide a user ID."),
  ]),

  getUserReplies
);

export default replyRouter;
