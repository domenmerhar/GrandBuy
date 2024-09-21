import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getMyBans = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
  }
);

export const createBan = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(201);
  }
);
