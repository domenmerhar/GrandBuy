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
//TODO: CHECK EVERY ROUTER FOR AUTH MIDDLEWARE
//TODO: NORMALIZE RESPONE FORMAT

//TODO: GET ONE USER

const userRouter = Router();

userRouter.route("/login").post(
  validate([
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please provide a valid email.")
      .notEmpty()
      .withMessage("Please provide an email."),

    body("password")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid password.")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a password that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a password."),
  ]),

  login
);

userRouter.route("/signup").post(
  validate([
    body("username")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid username.")
      .notEmpty()
      .withMessage("Please provide a username."),

    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please provide a valid email.")
      .notEmpty()
      .withMessage("Please provide an email."),

    body("password")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid password")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a password that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a password."),

    body("confirmPassword")
      .trim()
      .escape()
      .escape()
      .isString()
      .withMessage("Please provide a valid confirmPassword")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a confirmPassword that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a confirmPassword."),
  ]),

  signup
);

userRouter.route("/forgot-password").patch(
  validate([
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please provide a valid email.")
      .notEmpty()
      .withMessage("Please provide an email."),
  ]),

  forgotPassword
);
userRouter.route("/confirm-forgot-password").patch(
  validate([
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please provide a valid email.")
      .notEmpty()
      .withMessage("Please provide an email."),

    body("verificationCode")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid verificationCode.")
      .notEmpty()
      .withMessage("Please provide a verificationCode."),

    body("password")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid password.")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a password that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a password."),

    body("confirmPassword")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid confirmPassword.")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a confirmPassword that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a confirmPassword."),
  ]),

  confirmForgotPassword
);

userRouter.route("/confirm-email/:verificationCode").patch(
  validate([
    param("verificationCode")
      .isString()
      .withMessage("Please provide a valid verificationCode.")
      .notEmpty()
      .withMessage("Please provide a verificationCode."),

    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please provide a valid email.")
      .notEmpty()
      .withMessage("Please provide an email.")
      .normalizeEmail(),
  ]),

  confirmEmail
);

userRouter.use(protect);
userRouter
  .route("/me")
  .get(getMe)
  .patch(
    validate([
      body("firstName").trim().escape().isString().optional(),
      body("lastName").trim().escape().isString().optional(),
      body("street").trim().escape().isString().optional(),
      body("city").trim().escape().isString().optional(),
      body("zipCode").trim().escape().isString().optional(),
      body("country").trim().escape().isString().optional(),
      body("phoneNumber")
        .isMobilePhone("any")
        .withMessage("Please provide a valid phoneNumber")
        .optional(),
    ]),

    fileUpload({ createParentPath: true }),
    fileExtLimiterOne("image", [".png", ".jpg", ".jpeg"], true),
    updateMe
  );

userRouter.route("/logout").post(logout);
userRouter.route("/change-password").patch(
  validate([
    body("password")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid password.")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a password that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a password."),

    body("confirmPassword")
      .trim()
      .escape()
      .isString()
      .withMessage("Please provide a valid confirmPassword.")
      .isLength({ min: 6 })
      .withMessage(
        "Please provide a confirmPassword that is longer than 6 characters."
      )
      .notEmpty()
      .withMessage("Please provide a confirmPassword."),
  ]),

  changePassword
);

userRouter.use(restrictTo("admin"), restrictPrivileges("admin"));
userRouter.route("/").get(getAll(User));

userRouter
  .route("/:userId")
  .delete(
    validate([
      param("userId")
        .isMongoId()
        .withMessage("Please provide a valid user ID.")
        .notEmpty()
        .withMessage("Please provide a user ID."),
    ]),

    deleteUser
  )
  .patch(
    validate([
      param("userId")
        .isMongoId()
        .withMessage("Please provide a user ID.")
        .notEmpty()
        .withMessage("Please provide a user ID."),

      body("privileges")
        .isArray({ max: 5 })
        .withMessage("Please provide an array of privileges.")
        .notEmpty()
        .withMessage("Please provide at least one privilege."),
    ]),

    restrictPrivileges("ban", "coupon", "notification", "request"),
    updatePrivileges
  );

userRouter.route("/:userId/role/:role").patch(
  validate([
    param("userId")
      .isMongoId()
      .withMessage("Please provide a user ID.")
      .notEmpty()
      .withMessage("Please provide a user ID."),

    param("role")
      .isIn(["user", "seller", "admin"])
      .withMessage("Role must be user, seller or admin.")
      .notEmpty()
      .withMessage("Please provide a role."),
  ]),

  updateRole
);

export default userRouter;
