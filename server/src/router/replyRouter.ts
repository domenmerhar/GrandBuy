import express from "express";
import { protect } from "../controllers/authController";
import {
  createReply,
  deleteReply,
  getReply,
  getReviewReplies,
} from "../controllers/replyController";

const replyRouter = express.Router();

replyRouter.route("/:id").get(getReply).delete(protect, deleteReply);

replyRouter
  .route("/review/:reviewId")
  .get(getReviewReplies)
  .post(protect, createReply);

export default replyRouter;
