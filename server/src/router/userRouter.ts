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
//TODO: NOT EMPTY CHECK
//TODO: CHECK EVERY ROUTER FOR AUTH MIDDLEWARE
//TODO: NORMALIZE RESPONE FORMAT

//TODO: GET ONE USER

const userRouter = Router();

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signup);

userRouter.route("/forgot-password").patch(forgotPassword);
userRouter.route("/confirm-forgot-password").patch(confirmForgotPassword);

userRouter.route("/confirm-email/:verificationCode").patch(confirmEmail);

userRouter.use(protect);
userRouter
  .route("/me")
  .get(getMe)
  .patch(
    fileUpload({ createParentPath: true }),
    fileExtLimiterOne("image", [".png", ".jpg", ".jpeg"], true),
    updateMe
  );

userRouter.route("/logout").post(logout);
userRouter.route("/change-password").patch(changePassword);

userRouter.use(restrictTo("admin"), restrictPrivileges("admin"));
userRouter.route("/").get(getAll(User));

//TODO: ADD PATCH ROUTE FOR UPDATING PRIVELLEGES
userRouter
  .route("/:userId")
  .delete(deleteUser)
  .patch(
    restrictPrivileges("ban", "coupon", "notification", "request"),
    updatePrivileges
  );
userRouter.route("/:userId/role/:role").patch(updateRole);

export default userRouter;
