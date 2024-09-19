import express from "express";
import { protect } from "../controllers/authController";
import {
  createReply,
  deleteReply,
  getPostReplies,
  getReply,
} from "../controllers/replyController";

const replyRouter = express.Router();

replyRouter.route("/:id").get(getReply).delete(protect, deleteReply);

replyRouter
  .route("/post/:postId")
  .get(getPostReplies)
  .post(protect, createReply);

export default replyRouter;
