import { Router } from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  getMe,
  getUsers,
  login,
  logout,
  signup,
  updateMe,
  updateRole,
} from "../controllers/userController";
import { protect, restrictTo } from "../controllers/authController";
const userRouter = Router();

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signup);

userRouter.route("/forgot-password").patch(forgotPassword);

userRouter.use(protect);
userRouter.route("/me").get(getMe).patch(updateMe);
userRouter.route("/logout").post(logout);
userRouter.route("/change-password").patch(changePassword);

userRouter.use(restrictTo("admin"));
userRouter.route("/").get(protect, restrictTo("admin"), getUsers);

userRouter.route("/:userId").delete(deleteUser);
userRouter.route("/:userId/role/:role").patch(updateRole);

export default userRouter;
