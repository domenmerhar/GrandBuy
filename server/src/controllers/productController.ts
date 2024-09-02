import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: SEARCH, FILTER, SORT, PAGINATION
    res.status(200).json({ message: "getProducts" });
  }
);

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "addProduct" });
  }
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "updateProduct" });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "deleteProduct" });
  }
);

export const getHighestDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getReviews" });
  }
);

export const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getSellerProducts" });
  }
);
