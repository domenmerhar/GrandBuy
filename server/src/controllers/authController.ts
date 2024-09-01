import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return next(
        new AppError("You are not logged in. Please login to get access.", 401)
      );

    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    res.locals.token = decoded;

    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    if (user.jwtChangedAfter(user, decoded.iat))
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    res.locals.user = user;

    next();
  }
);

type role = "user" | "seller" | "admin";

export const restrictTo =
  (...roles: role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user && process.env.NODE_ENV !== "development")
      console.error(
        "RestrictTo middleware is being used before protect middleware."
      );

    if (!roles.includes(res.locals.role))
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );

    next();
  };
