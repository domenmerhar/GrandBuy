import express from "express";
import { getAll, getOne } from "../controllers/handlerFactory";
import Ban from "../models/banModel";
import { protect, restrictTo } from "../controllers/authController";
import { createBan, getMyBans, deleteBan } from "../controllers/banController";

const banRouter = express.Router();

banRouter.use(protect);

banRouter.route("/me").get(getMyBans);

banRouter.use(restrictTo("admin"));

banRouter
  .route("/")
  .get(getAll(Ban, [{ path: "user", select: "_id name" }]))
  .post(createBan);

banRouter
  .route("/:id")
  .get(getOne(Ban, [{ path: "user", select: "_id name" }]))
  .delete(deleteBan);

export default banRouter;
