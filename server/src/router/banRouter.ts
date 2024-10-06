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
      body("user").isMongoId().notEmpty(),
      body("days").isNumeric().notEmpty().isInt({ min: 1 }),
      body("message").isString().notEmpty(),
    ]),
    createBan
  );

banRouter
  .route("/:id")
  .get(
    validate([param("id").isMongoId().notEmpty()]),
    getOne(Ban, [{ path: "user", select: "_id name" }])
  )
  .delete(validate([param("id").isMongoId().notEmpty()]), deleteBan);

export default banRouter;
