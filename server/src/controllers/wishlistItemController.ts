import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import WishlistItem from "../models/wishlistItemModel";
import APIFeatures from "../utils/ApiFeatures";
import AppError from "../utils/AppError";
import productModel from "../models/productModel";

export const getWishlistItemCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const items = await WishlistItem.countDocuments({
      user: userId,
    });

    res.status(200).json({
      status: "success",
      data: {
        items,
      },
    });
  }
);

export const getWishlistItemByProductID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const wishlistItem = await WishlistItem.findOne({
      user: userId,
      productId: productId,
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
      WishlistItem.find({ user: userId }),
      req.query
    );

    const wishlistItems = await features.filter().sort().paginate().query;

    const totalItemsFeatures = new APIFeatures(
      WishlistItem.find({ user: userId }),
      req.query
    );

    const totalItems = await totalItemsFeatures.filter().query.countDocuments();

    res.status(200).json({
      status: "success",
      results: wishlistItems.length,
      totalItems: totalItems,
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

    const product = await productModel.findOne({
      _id: productId,
      isSelling: { $ne: false },
    });
    if (!product) return next(new AppError("Product not found", 404));

    const wishlistItem = await WishlistItem.create({
      user: userId,
      productId: productId,
      name: product.name,
      shipping: product.shipping,
      totalPrice: product.totalPrice,
      coverImage: product.coverImage,
      discount: product.discount,
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
      productId: productId,
    });

    if (!removedItem)
      return next(new AppError("No item found with that ID", 404));

    res.status(204).json({ status: "success", data: null });
  }
);
