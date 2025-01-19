import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import HistoryItem from "../models/historyItemModel";
import APIFeatures from "../utils/ApiFeatures";
import Product from "../models/productModel";
import AppError from "../utils/AppError";

export const getHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const features = new APIFeatures(HistoryItem.find({ user: id }), req.query);

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
  next();
};

export const addToHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) return next();

    const userId = res.locals.user._id;
    const productId = req.params.productId;

    if (!userId) return next();

    const product = await Product.findOne({
      _id: productId,
      isSelling: { $ne: false },
    });

    if (!product) return next(new AppError("Product not found", 404));

    let historyItem = await HistoryItem.findOne({
      user: userId,
      product: productId,
    });

    if (!historyItem) {
      historyItem = await HistoryItem.create({
        user: userId,
        product: productId,
        name: product.name,
        coverImage: product.coverImage,
        discount: product.discount,
        totalPrice: product.totalPrice,
      });
      return next();
    }

    historyItem.createdAt = new Date(Date.now());
    await historyItem.save();

    next();
  }
);
