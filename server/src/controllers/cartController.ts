import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import CartItem from "../models/cartItemModel";
import APIFeatures from "../utils/ApiFeatures";

export const getCartItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const features = new APIFeatures(CartItem.find({ userId }), req.query);

    const cartItems = await features.paginate().sort().query;

    if (!cartItems) return next(new AppError("No items found", 404));

    res.status(200).json({
      status: "success",
      length: cartItems.length,
      data: {
        cartItems,
      },
    });
  }
);

export const updateItemQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { quantity } = req.body;
    const { cartId } = req.params;

    if (!quantity) {
      return next(new AppError("Quantity is required", 400));
    }

    const updatedItem = await CartItem.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true }
    );

    if (!updatedItem) return next(new AppError("Item not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        updatedItem,
      },
    });
  }
);

export const createCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;
    const userId = res.locals.user._id;

    const newItem = await CartItem.create({ productId, quantity, userId });

    res.status(201).json({
      status: "success",
      data: {
        newItem,
      },
    });
  }
);

export const deleteCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;

    const deletedItem = await CartItem.findByIdAndDelete(cartId);

    if (!deletedItem) return next(new AppError("Item not found", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);