import express from "express";
import { getAll, getOne } from "../controllers/handlerFactory";
import Ban from "../models/banModel";
import { protect, restrictTo } from "../controllers/authController";
import { createBan, getMyBans, deleteBan } from "../controllers/banController";
import { restrictPrivileges } from "../controllers/userController";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

const banRouter = express.Router();

banRouter.use(protect);

banRouter.route("/me").get(getMyBans);

banRouter.use(restrictTo("admin"), restrictPrivileges("ban"));

banRouter
  .route("/")
  .get(getAll(Ban, [{ path: "user", select: "_id name" }]))
  .post(
    validate([
      body("user")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide a user ID."),
      body("days")
        .isNumeric()
        .withMessage("Please provide valid days.")
        .notEmpty()
        .withMessage("Please provide days.")
        .isInt({ min: 1 })
        .withMessage("Days must be greater than 1."),
      body("message")
        .isString()
        .withMessage("Please provide a valid message.")
        .notEmpty()
        .withMessage("Please provide a message."),
    ]),
    createBan
  );

banRouter
  .route("/:id")
  .get(
    validate([
      param("id")
        .isMongoId()
        .withMessage("Please provide a valid ID.")
        .notEmpty()
        .withMessage("Please provide an ID."),
    ]),
    getOne(Ban, [{ path: "user", select: "_id name" }])
  )
  .delete(
    validate([
      param("id")
        .isMongoId()
        .withMessage("Please provide an ID.")
        .notEmpty()
        .withMessage("Please provide a valid ID."),
    ]),
    deleteBan
  );

export default banRouter;
