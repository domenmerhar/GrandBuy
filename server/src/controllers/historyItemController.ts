import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import HistoryItem from "../models/historyItemModel";

export const getHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      status: "success",
      message: "Get all history items",
    });
  }
);

export const addToHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    if (!userId) return next();

    const historyItem = await HistoryItem.findOne({ userId, productId });

    if (!historyItem) {
      const newItem = await HistoryItem.create({ userId, productId });
      console.log({ newItem });
      return next();
    }

    historyItem.createdAt = new Date(Date.now());
    await historyItem.save();

    next();
  }
);
