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
import { validate } from "../utils/validate";
import { param } from "express-validator";

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

requestRouter
  .route("/cancel/:id")
  .patch(
    validate([param("id").isMongoId().notEmpty()]),
    restrictTo("user"),
    cancelRequest
  );

requestRouter.use(
  validate([param("id").isMongoId().notEmpty()]),
  restrictTo("admin"),
  restrictPrivileges("request")
);

requestRouter
  .route("/accept/:id")
  .patch(validate([param("id").isMongoId().notEmpty()]), acceptRequest);

requestRouter
  .route("/reject/:id")
  .patch(validate([param("id").isMongoId().notEmpty()]), rejectRequest);

requestRouter
  .route("/:id")
  .get(validate([param("id").isMongoId().notEmpty()]), getRequest);

export default requestRouter;
