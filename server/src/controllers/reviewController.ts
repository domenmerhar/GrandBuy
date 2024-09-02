import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getReviews" });
  }
);

export const getProductReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getProductReviews" });
  }
);

export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({ message: "createReview" });
  }
);

export const getUserReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getUserReviews" });
  }
);

export const getMyReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getMyReviews" });
  }
);

export const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getReview" });
  }
);

export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "updateReview" });
  }
);

export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).json({ message: "deleteReview" });
  }
);
