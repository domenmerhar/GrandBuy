import { Router } from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  getUsers,
  login,
  logout,
  signUp,
  updateMe,
  updateUser,
} from "../controllers/userController";

const userRouter = Router();

userRouter.route("/").get(getUsers).patch(updateUser).delete(deleteUser);

userRouter.route("/updateMe").patch(updateMe);

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signUp);

userRouter.route("/logout").post(logout);

userRouter.route("/change-password").patch(changePassword);

userRouter.route("/forgot-password").patch(forgotPassword);

export default userRouter;
