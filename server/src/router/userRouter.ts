import { Router } from "express";
import {
  changePassword,
  createUser,
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

if (process.env.NODE_ENV === "development") {
  userRouter.route("/").get(getUsers).post(createUser).delete(deleteUser);
}

userRouter.route("/").patch(updateUser);

userRouter.route("/updateMe").patch(updateMe);

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signUp);

userRouter.route("/logout").post(logout);

userRouter.route("/change-password").patch(changePassword);

userRouter.route("/forgot-password").patch(forgotPassword);

export default userRouter;
