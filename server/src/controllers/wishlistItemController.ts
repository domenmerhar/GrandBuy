import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import WishlistItem from "../models/wishlistItemModel";
import APIFeatures from "../utils/ApiFeatures";

export const getWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const features = new APIFeatures(
      WishlistItem.find({ userId }).populate({
        path: "productId",
        select: "name price imageCover",
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

    const wishlistItem = await WishlistItem.create({ userId, productId });

    res.status(201).json({
      status: "success",
      data: {
        wishlistItem,
      },
    });
  }
);

export const removeFromWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
