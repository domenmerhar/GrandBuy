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
import { protect } from "../controllers/authController";
const userRouter = Router();

if (process.env.NODE_ENV === "development") {
  userRouter.route("/").get(protect, getUsers).post(createUser);
}

userRouter.route("/:userId").patch(updateUser).delete(deleteUser);

userRouter.route("/updateMe").patch(updateMe);

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signUp);

userRouter.route("/logout").post(logout);

userRouter.route("/change-password").patch(changePassword);

userRouter.route("/forgot-password").patch(forgotPassword);

export default userRouter;
