import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

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
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined!",
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
