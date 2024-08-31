import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: "GET /user" });
};

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
