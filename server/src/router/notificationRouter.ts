import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createNotification,
  getCreatedNotifications,
  getNotification,
  getUnreadNotificationCount,
  getYourNotifications,
} from "../controllers/notificationController";
import { getAll } from "../controllers/handlerFactory";
import Notification from "../models/notificationModel";
import { restrictPrivileges } from "../controllers/userController";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const notificationRouter = express.Router();

notificationRouter.use(protect);

notificationRouter.route("/").get(getYourNotifications);

notificationRouter.route("/count").get(getUnreadNotificationCount);

notificationRouter
  .route("/admin")
  .get(
    restrictTo("admin"),
    restrictPrivileges("notification"),
    getCreatedNotifications,
    getAll(Notification)
  );

notificationRouter
  .route("/:id")
  .get(validate([param("id").isMongoId()]), getNotification);

notificationRouter
  .route("/create/:userId")
  .post(
    validate([
      param("userId").isMongoId(),
      body("type").isIn(["message", "warning"]),
      body("message").isString().notEmpty(),
    ]),
    restrictTo("admin"),
    restrictPrivileges("notification"),
    createNotification
  );

export default notificationRouter;
