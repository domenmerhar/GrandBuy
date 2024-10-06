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
  .get(validate([param("id").isMongoId().notEmpty()]), getReply)
  .delete(protect, deleteReply);

replyRouter
  .route("/review/:reviewId")
  .get(validate([param("reviewId").isMongoId().notEmpty()]), getReviewReplies)
  .post(
    validate([
      param("reviewId").isMongoId().notEmpty(),
      body("reply").isString().notEmpty(),
    ]),
    protect,
    createReply
  );

replyRouter
  .route("/user/:userId")
  .get(validate([param("userId").isMongoId().notEmpty()]), getUserReplies);

export default replyRouter;
