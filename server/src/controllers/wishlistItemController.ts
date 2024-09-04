import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import WishlistItem from "../models/wishlistItemModel";

export const getWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
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
