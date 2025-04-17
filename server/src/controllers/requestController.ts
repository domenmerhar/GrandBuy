import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import requestModel from "../models/requestModel";
import AppError from "../utils/AppError";
import notificationModel from "../models/notificationModel";
import User from "../models/userModel";

const changeRequestStatus = async (
  requestId: string,
  adminId: string,
  status: "rejected" | "accepted"
) => {
  const request = await requestModel.findOneAndUpdate(
    {
      _id: requestId,
      status: "pending",
    },
    {
      status,
    },
    { new: true }
  );

  if (!request) throw new AppError("Request not found", 404);

  await notificationModel.create({
    user: request.user,
    createdBy: adminId,
    type: "message",
    message: `Zahteva za pridobitev vloge prodajalca je bila ${status === "accepted" ? "odobrena" : "zavrnjen"}`,
  });

  return request;
};

export const getRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const request = await requestModel
      .findById(id)
      .populate({ path: "user", select: "_id username " });

    res.status(200).json({
      status: "success",
      data: {
        request,
      },
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
      status: "success",
      data: {
        request: newRequest,
      },
    });
  }
);

export const acceptRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const request = await changeRequestStatus(
      req.params.id,
      res.locals.user._id,
      "accepted"
    );

    await User.findByIdAndUpdate(
      request.user,
      { role: "seller" },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        request,
      },
    });
  }
);

export const rejectRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const request = await changeRequestStatus(
      req.params.id,
      res.locals.user._id,
      "rejected"
    );

    res.status(200).json({
      status: "success",
      data: {
        request: request,
      },
    });
  }
);

export const cancelRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const { id } = req.params;

    const request = await requestModel.findOneAndDelete({
      _id: id,
      user: userId,
      status: "pending",
    });

    if (!request) throw new AppError("Request not found", 404);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
