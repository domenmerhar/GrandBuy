import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Get reply",
      },
    });
  }
);

export const getPostReplies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Get post replies",
      },
    });
  }
);

export const createReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Create reply",
      },
    });
  }
);

export const deleteReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Delete reply",
      },
    });
  }
);
