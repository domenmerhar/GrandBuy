import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

export const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateOrderStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getSellerOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
