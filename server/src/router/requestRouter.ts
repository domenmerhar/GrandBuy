import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { getAll } from "../controllers/handlerFactory";
import requestModel from "../models/requestModel";
import {
  acceptRequest,
  createRequest,
  getRequest,
  rejectRequest,
} from "../controllers/requestController";

const requestRouter = express.Router();

requestRouter.use(protect);

requestRouter
  .route("/")
  .post(restrictTo("user"), createRequest)
  .get(restrictTo("admin"), getAll(requestModel));
requestRouter.route("/:id").get(restrictTo("admin"), getRequest);

requestRouter.route("/accept/:id").patch(restrictTo("admin"), acceptRequest);

requestRouter.route("/reject/:id").patch(restrictTo("admin"), rejectRequest);

export default requestRouter;
