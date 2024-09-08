import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import HistoryItem from "../models/historyItemModel";
import APIFeatures from "../utils/ApiFeatures";

export const getHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const features = new APIFeatures(
      HistoryItem.find({ user: id }).populate("product"),
      req.query
    );

    const historyItems = await features.filter().paginate().sort().query;

    res.json({
      status: "success",
      length: historyItems.length,
      data: { historyItems },
    });
  }
);

export const filterYourHistory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.query);
  next();
};

export const addToHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    if (!userId) return next();

    const historyItem = await HistoryItem.findOne({
      user: userId,
      product: productId,
    });

    if (!historyItem) {
      const newItem = await HistoryItem.create({
        user: userId,
        product: productId,
      });
      return next();
    }

    historyItem.createdAt = new Date(Date.now());
    await historyItem.save();

    next();
  }
);
