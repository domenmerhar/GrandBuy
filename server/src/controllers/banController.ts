import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import Ban from "../models/banModel";
import Notification from "../models/notificationModel";
import { Email } from "../utils/email";

export const getMyBans = catchAsync(
  //TODO
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
  }
);

export const createBan = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user: userId, days, message } = req.body;
    const validUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const user = await User.findOne({ _id: userId, verified: true }).select(
      "email"
    );
    if (!user) return next(new AppError("No user found with that ID", 404));

    const existingBan = await Ban.findOne({
      user: userId,
      validUntil: { $gt: validUntil },
    });
    if (existingBan) return next(new AppError("User is already banned", 400));

    const ban = await Ban.create({
      user: userId,
      validUntil,
      message,
    });

    await new Email(user.email).sendBanEmail(validUntil);

    await Notification.create({
      user: userId,
      createdBy: res.locals.user._id,
      type: "warning",
      message: `You have been banned until ${validUntil.toDateString()}`,
    });

    await User.findByIdAndUpdate(userId, {
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

export const deleteBan = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const ban = await Ban.findOneAndDelete({
      _id: id,
      validUntil: { $gt: new Date() },
    });
    if (!ban)
      return next(new AppError("No active ban found with that ID", 404));

    const user = await User.findOneAndUpdate(
      { _id: ban.user, banned: true },
      { banned: false }
    );
    if (!user) return next(new AppError("No user found with that ID", 404));

    await new Email(user.email).sendUnbanEmail();

    await Notification.create({
      user: ban.user,
      createdBy: res.locals.user._id,
      type: "message",
      message: `Your ban valid until ${ban.validUntil.toDateString()} has been lifted.`,
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
