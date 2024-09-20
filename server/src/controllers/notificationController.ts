import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import Notification from "../models/notificationModel";
import APIFeatures from "../utils/ApiFeatures";

export const getCreatedNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    req.query.createdBy = userId;

    next();
  }
);

export const getYourNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const notifications = await new APIFeatures(
      Notification.find({ user: userId }).select(
        "_id type message viewed createdAt"
      ),
      req.query,
      ["createdBy"]
    )
      .sort()
      .filter().query;

    res.status(200).json({
      status: "success",
      data: {
        notifications,
      },
    });
  }
);

export const getNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        user: res.locals.user._id,
      },
      { viewed: true },
      { new: true }
    );

    if (!notification) return next(new AppError("Notification not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        notification,
      },
    });
  }
);

export const getUnreadNotificationCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const count = await Notification.countDocuments({
      user: userId,
      viewed: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  }
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
