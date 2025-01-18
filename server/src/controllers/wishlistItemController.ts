import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import WishlistItem from "../models/wishlistItemModel";
import APIFeatures from "../utils/ApiFeatures";
import AppError from "../utils/AppError";

export const getWishlistItemByProductID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const wishlistItem = await WishlistItem.findOne({
      user: userId,
      product: productId,
    });

    if (!wishlistItem)
      return next(new AppError("No item found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        wishlistItem,
      },
    });
  }
);

export const getWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const features = new APIFeatures(
      WishlistItem.find({ user: userId }).populate({
        path: "product",
        select: "name price shipping imageCover",
      }),
      req.query
    );

    const wishlistItems = await features.filter().sort().paginate().query;

    res.status(200).json({
      status: "success",
      results: wishlistItems.length,
      data: {
        wishlistItems,
      },
    });
  }
);

export const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const wishlistItem = await WishlistItem.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      status: "success",
      data: {
        wishlistItem,
      },
    });
  }
);

export const removeFromWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;

    const removedItem = await WishlistItem.findOneAndDelete({
      user: userId,
      _id: id,
    });

    if (!removedItem)
      return next(new AppError("No item found with that ID", 404));

    res.status(204).json({ status: "success", data: null });
  }
);

export const removeFromWishlistWithProductId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const removedItem = await WishlistItem.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!removedItem)
      return next(new AppError("No item found with that ID", 404));

    res.status(204).json({ status: "success", data: null });
  }
);
