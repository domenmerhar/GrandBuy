import { Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  if (users.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No users found.",
    });
  }

  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users: [],
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

    res.status(201).json({ status: "sucess", data: newUser });
  }
);

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "PATCH /user" });
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(204).json({ message: "DELETE /user" });
};

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
