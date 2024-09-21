import express from "express";
import { getAll, getOne } from "../controllers/handlerFactory";
import Ban from "../models/banModel";
import { protect, restrictTo } from "../controllers/authController";
import { createBan, getMyBans } from "../controllers/banController";

const banRouter = express.Router();

banRouter.use(protect);

banRouter.route("/me").get(getMyBans);

banRouter.use(restrictTo("admin"));

banRouter
  .route("/")
  .post(createBan)
  .get(getAll(Ban, [{ path: "user", select: "_id name" }]));

banRouter
  .route("/:id")
  .get(getOne(Ban, [{ path: "user", select: "_id name" }]));

export default banRouter;
