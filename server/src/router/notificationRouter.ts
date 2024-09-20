import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createNotification,
  getAdminNotifications,
  getNotification,
  getUnreadNotificationCount,
  getYourNotifications,
} from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.use(protect);

notificationRouter.route("/").get(getYourNotifications);

notificationRouter.route("/count").get(getUnreadNotificationCount);

notificationRouter.route("/:id").get(getNotification);

notificationRouter.use(restrictTo("admin"));

notificationRouter.route("/create/:userId").post(createNotification);

notificationRouter.route("/admin/").get(getAdminNotifications);

export default notificationRouter;
