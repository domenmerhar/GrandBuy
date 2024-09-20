import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import Notification from "../models/notificationModel";

export const getAdminNotifications = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {}
);

export const getYourNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getUnreadNotificationCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { type, message } = req.body;
    const createdBy = res.locals.user._id;

    const user = await User.findById(userId);
    if (!user) return next(new AppError("User not found", 404));

    const notifcation = await Notification.create({
      user: userId,
      createdBy,
      type,
      message,
    });

    res.status(201).json({
      status: "success",
      data: {
        notifcation,
      },
    });
  }
);
