import { Router } from "express";
import {
  changePassword,
  confirmEmail,
  confirmForgotPassword,
  deleteUser,
  forgotPassword,
  getMe,
  login,
  logout,
  restrictPrivileges,
  signup,
  updateMe,
  updatePrivileges,
  updateRole,
} from "../controllers/userController";
import { protect, restrictTo } from "../controllers/authController";
import { getAll } from "../controllers/handlerFactory";
import User from "../models/userModel";
import fileUpload from "express-fileupload";
import { fileExtLimiterOne } from "../controllers/fileController";
import { validate } from "../utils/validate";
import { body, param } from "express-validator";
//TODO: NOT EMPTY CHECK
//TODO: CHECK EVERY ROUTER FOR AUTH MIDDLEWARE
//TODO: NORMALIZE RESPONE FORMAT

//TODO: GET ONE USER

const userRouter = Router();

userRouter
  .route("/login")
  .post(
    validate([
      body("email").isEmail(),
      body("password").isString().isLength({ min: 6 }),
    ]),
    login
  );

userRouter
  .route("/signup")
  .post(
    validate([
      body("username").isString(),
      body("email").isEmail(),
      body("password").isString().isLength({ min: 6 }),
      body("confirmPassword").isString().isLength({ min: 6 }),
    ]),
    signup
  );

userRouter
  .route("/forgot-password")
  .patch(validate([body("email").isEmail()]), forgotPassword);
userRouter
  .route("/confirm-forgot-password")
  .patch(
    validate([
      body("email").isEmail(),
      body("verificationCode").isString(),
      body("password").isString().isLength({ min: 6 }),
      body("confirmPassword").isString().isLength({ min: 6 }),
    ]),
    confirmForgotPassword
  );

userRouter
  .route("/confirm-email/:verificationCode")
  .patch(
    validate([param("verificationCode").isString(), body("email").isEmail()]),
    confirmEmail
  );

userRouter.use(protect);
userRouter
  .route("/me")
  .get(getMe)
  .patch(
    validate([
      body("firstName").isString().optional(),
      body("lastName").isString().optional(),
      body("street").isString().optional(),
      body("city").isString().optional(),
      body("zipCode").isString().optional(),
      body("country").isString().optional(),
      body("phoneNumber").isMobilePhone("any").optional(),
    ]),
    fileUpload({ createParentPath: true }),
    fileExtLimiterOne("image", [".png", ".jpg", ".jpeg"], true),
    updateMe
  );

userRouter.route("/logout").post(logout);
userRouter
  .route("/change-password")
  .patch(
    validate([
      body("password").isString().isLength({ min: 6 }),
      body("confirmPassword").isString().isLength({ min: 6 }),
    ]),
    changePassword
  );

userRouter.use(restrictTo("admin"), restrictPrivileges("admin"));
userRouter.route("/").get(getAll(User));

//TODO: ADD PATCH ROUTE FOR UPDATING PRIVELLEGES
userRouter
  .route("/:userId")
  .delete(validate([param("userId").isMongoId()]), deleteUser)
  .patch(
    validate([
      param("userId").isMongoId(),
      body("privileges").isArray({ max: 5 }),
    ]),
    restrictPrivileges("ban", "coupon", "notification", "request"),
    updatePrivileges
  );

userRouter
  .route("/:userId/role/:role")
  .patch(
    validate([
      param("userId").isMongoId(),
      param("role").isIn(["user", "seller", "admin"]),
    ]),
    updateRole
  );

export default userRouter;
