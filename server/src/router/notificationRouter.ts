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

notificationRouter.route("/:id").get(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  getNotification
);

notificationRouter
  .route("/create/:userId")
  .post(
    validate([
      param("userId")
        .isMongoId()
        .withMessage("Please provide a valid user ID.")
        .notEmpty()
        .withMessage("Please provide a user ID."),

      body("type")
        .isIn(["message", "warning"])
        .withMessage("Type must be message or warning.")
        .notEmpty()
        .withMessage("Please provide a type."),

      body("message")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("Please provide a message."),
    ]),
    restrictTo("admin"),
    restrictPrivileges("notification"),
    createNotification
  );

export default notificationRouter;
