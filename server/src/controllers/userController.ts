import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { role } from "../utils/types";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

const createToken = (id: Types.ObjectId) =>
  jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signup = catchAsync(
  async (
    req: Request<
      {},
      {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      }
    >,
    res: Response
  ) => {
    const { username, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
      confirmPassword,
    });

    newUser.password = newUser.__v = newUser.jwtChangedAt = undefined!;

    const token = createToken(newUser._id);

    res.status(201).json({ status: "sucess", data: newUser, token });
  }
);

export const updateRole = catchAsync(
  async (
    req: Request<{ userId: string; role: role }, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, role } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { runValidators: true }
    );

    if (!user) return next(new AppError("No user found with that ID.", 404));

    res.status(200).json({ status: "success", data: user });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findOneAndDelete({ _id: userId });

    if (!user) return next(new AppError("No user found with that ID", 404));

    res.status(204).json({ status: "success", data: null });
  }
);

export const updateMe = catchAsync(
  async (
    req: Request<{
      firstName?: string;
      lastName?: string;
      street?: string;
      city?: string;
      zipCode?: string;
      country?: string;
      phoneNumber?: string;
    }>,
    res: Response
  ) => {
    const id = res.locals.user.id;

    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    }).select("-_id -jwtChangedAt");

    res.status(200).json({ status: "success", data: user });
  }
);

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;
  user.jwtChangedAt = undefined;

  res.status(200).json({ status: "success", data: res.locals.user });
});

export const login = catchAsync(
  async (
    req: Request<{ email: string; password: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("password username role");

    if (!user)
      return next(new AppError("Email or password is incorrect.", 401));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new AppError("Email or password is incorrect.", 401));

    const token = createToken(user._id);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Logged in.",
      data: {
        user: {
          username: user.username,
          role: user.role,
        },
      },
      token,
    });
  }
);

export const logout = catchAsync(async (req: Request, res: Response) => {
  await res.locals.user.logout();

  res.status(200).json({ status: "success", message: "Logged out." });
});

export const changePassword = catchAsync(
  async (
    req: Request<{ password: string; confirmPassword: string }>,
    res: Response
  ) => {
    const { password, confirmPassword } = req.body;

    res.locals.user.password = password;
    res.locals.user.confirmPassword = confirmPassword;

    await res.locals.user.save();

    res.status(200).json({ status: "success", message: "Password changed." });
  }
);

//TODO: email
export const forgotPassword = (req: Request, res: Response) => {
  res.status(200).json({ message: "PATCH /user/forgot-password" });
};
