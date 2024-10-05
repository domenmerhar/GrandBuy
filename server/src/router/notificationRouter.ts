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

notificationRouter.route("/:id").get(getNotification);

notificationRouter
  .route("/create/:userId")
  .post(
    restrictTo("admin"),
    restrictPrivileges("notification"),
    createNotification
  );

export default notificationRouter;
