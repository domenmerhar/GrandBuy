import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export interface AuthRequest extends Request {
  token: string | JwtPayload;
  user?: {};
}

export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return next(
        new AppError("You are not logged in. Please login to get access.", 401)
      );

    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.token = decoded;

    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    req.user = user;

    console.log(req.user);
    console.log(req.token);

    next();
  }
);
