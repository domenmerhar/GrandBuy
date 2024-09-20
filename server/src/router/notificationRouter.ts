import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createNotification,
  getNotification,
  getNotificationCount,
  getYourNotifications,
} from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.use(protect);

notificationRouter.route("/").get(getYourNotifications);

notificationRouter.route("/count").get(getNotificationCount);

notificationRouter.route("/:id").get(getNotification);

notificationRouter
  .route("/create/:userId")
  .post(restrictTo("admin"), createNotification);

export default notificationRouter;
