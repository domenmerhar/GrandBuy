import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import CartItem from "../models/cartItemModel";
import APIFeatures from "../utils/ApiFeatures";
import productModel from "../models/productModel";

const sellerChangeOrderStatus = async (
  orderId: string,
  sellerId: string,
  status: "shipped" | "cancelled"
) => {
  const orderedCartItem = await CartItem.findOneAndUpdate(
    {
      _id: orderId,
      ordered: true,
      status: { $nin: ["shipped", "delivered"] },
      product: {
        $in: await productModel.find({ user: sellerId }).select("_id"),
      },
    },
    { status },
    { new: true }
  );

  if (!orderedCartItem) throw new AppError("Item not found", 404);

  return orderedCartItem;
};

export const getCartItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const features = new APIFeatures(
      CartItem.find({ user: userId, ordered: { $ne: true } }),
      req.query
    );

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

    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: cartId, ordered: { $ne: true } },
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
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const item = await CartItem.findOne({
      product: productId,
      user: userId,
      ordered: { $ne: true },
    });
    if (item) {
      item.quantity += +quantity;
      res.locals.newItem = await item.save();
    } else
      res.locals.newItem = await CartItem.create({
        product: productId,
        quantity,
        user: userId,
      });

    res.status(201).json({
      status: "success",
      data: {
        item: res.locals.newItem,
      },
    });
  }
);

export const deleteCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;

    const deletedItem = await CartItem.findOneAndDelete({
      _id: cartId,
      ordered: { $ne: true },
    });

    if (!deletedItem) return next(new AppError("Item not found", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const shipOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderedCartItem = await sellerChangeOrderStatus(
      req.params.id,
      res.locals.user._id,
      "shipped"
    );

    res.status(200).json({
      status: "success",
      data: {
        orderedCartItem,
      },
    });
  }
);
