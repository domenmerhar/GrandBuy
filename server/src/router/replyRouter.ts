import express from "express";
import { protect } from "../controllers/authController";
import {
  createReply,
  deleteReply,
  getReply,
  getReviewReplies,
  getUserReplies,
} from "../controllers/replyController";

const replyRouter = express.Router();

replyRouter.route("/:id").get(getReply).delete(protect, deleteReply);

replyRouter
  .route("/review/:reviewId")
  .get(getReviewReplies)
  .post(protect, createReply);

replyRouter.route("/user/:userId").get(getUserReplies);

export default replyRouter;
