import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import userModel from "../models/userModel";
import AppError from "../utils/AppError";
import banModel from "../models/banModel";
import notificationModel from "../models/notificationModel";

export const getMyBans = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
  }
);

//TODO: CHECK BODY
export const createBan = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user: userId, days, message } = req.body;
    const validUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const user = await userModel.findOne({ _id: userId });
    if (!user) return next(new AppError("No user found with that ID", 404));

    const existingBan = await banModel.findOne({
      user: userId,
      validUntil: { $gt: validUntil },
    });
    if (existingBan) return next(new AppError("User is already banned", 400));

    const ban = await banModel.create({
      user: userId,
      validUntil,
      message,
    });

    console.log({ ban });

    const notification = await notificationModel.create({
      user: userId,
      createdBy: res.locals.user._id,
      type: "warning",
      message: `You have been banned until ${validUntil.toDateString()}`,
    });

    console.log({ notification });

    await userModel.findByIdAndUpdate(userId, {
      banned: true,
      jwtChangedAt: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        ban,
      },
    });
  }
);
