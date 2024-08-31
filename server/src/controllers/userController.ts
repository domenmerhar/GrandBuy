import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();

  if (users.length === 0) {
    next(new AppError("No users found.", 404));
  }

  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users,
    },
  });
};

export const createUser = catchAsync(
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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ status: "sucess", data: newUser, token });
  }
);

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "PATCH /user" });
};

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findOneAndDelete({ _id: userId });

    if (!user) return next(new AppError("No user found with that ID", 404));

    res.status(204).json({ message: "DELETE /user" });
  }
);

export const updateMe = (req: Request, res: Response) => {
  res.status(200).json({ message: "PATCH /user/updateMe" });
};

export const signUp = (req: Request, res: Response) => {
  res.status(201).json({ message: "POST /user/signup" });
};

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: "POST /user/login" });
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: "POST /user/logout" });
};

export const changePassword = (req: Request, res: Response) => {
  res.status(200).json({ message: "PATCH /user/change-password" });
};

export const forgotPassword = (req: Request, res: Response) => {
  res.status(200).json({ message: "PATCH /user/forgot-password" });
};
