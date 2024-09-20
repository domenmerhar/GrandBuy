import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import requestModel from "../models/requestModel";
import AppError from "../utils/AppError";

export const getRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined!",
    });
  }
);

export const createRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const existingRequest = await requestModel.findOne({
      user: userId,
      status: "pending",
    });

    if (existingRequest)
      return next(new AppError("Request already exists", 400));

    const newRequest = await requestModel.create({
      user: userId,
    });

    res.status(201).json({
      status: "succcess",
      data: {
        request: newRequest,
      },
    });
  }
);

export const acceptRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined!",
    });
  }
);

export const rejectRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined!",
    });
  }
);
