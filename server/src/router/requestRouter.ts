import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { getAll } from "../controllers/handlerFactory";
import requestModel from "../models/requestModel";
import {
  acceptRequest,
  cancelRequest,
  createRequest,
  getRequest,
  rejectRequest,
} from "../controllers/requestController";
import { restrictPrivileges } from "../controllers/userController";

const requestRouter = express.Router();

requestRouter.use(protect);

requestRouter
  .route("/")
  .post(restrictTo("user"), createRequest)
  .get(
    protect,
    restrictTo("admin"),
    restrictPrivileges("request"),
    getAll(requestModel)
  );

requestRouter.route("/cancel/:id").patch(restrictTo("user"), cancelRequest);

requestRouter.use(restrictTo("admin"), restrictPrivileges("request"));

requestRouter.route("/accept/:id").patch(acceptRequest);

requestRouter.route("/reject/:id").patch(rejectRequest);

requestRouter.route("/:id").get(getRequest);

export default requestRouter;
