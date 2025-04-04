import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { role } from "../utils/types";

//WARNING: jwtExiration checks

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

    const user = await User.findOne({ _id: decoded.id, verified: true });

    if (!user)
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    //const jwtExpired = User.jwtExpired(user.jwtChangedAt, decoded.iat);
    if (!user.jwtChangedAt || !decoded.iat)
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    const jwtExpired = +user.jwtChangedAt > decoded.iat;

    if (jwtExpired)
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    res.locals.user = user;

    next();
  }
);

export const saveUserToResponse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return next();

    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    res.locals.token = decoded;

    const user = await User.findOne({ _id: decoded.id, verified: true });

    if (!user) return next();

    //const jwtExpired = User.jwtExpired(user.jwtChangedAt, decoded.iat);

    if (!user.jwtChangedAt || !decoded.iat)
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );

    const jwtExpired = +user.jwtChangedAt > decoded.iat;

    if (jwtExpired) return next();

    res.locals.user = user;

    next();
  }
);

export const restrictTo =
  (...roles: role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user && process.env.NODE_ENV !== "development")
      console.error(
        "restrictTo middleware is being used before protect middleware."
      );

    if (!roles.includes(res.locals.user.role))
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );

    next();
  };
