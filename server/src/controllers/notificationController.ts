import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getYourNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getNotificationCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
