import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import CartItem from "../models/cartItemModel";
import APIFeatures from "../utils/ApiFeatures";
import Product from "../models/productModel";
import couponModel from "../models/couponModel";
import mongoose from "mongoose";

const sellerChangeOrderStatus = async (
  orderId: string,
  sellerId: string,
  status: "shipped" | "cancelled"
) => {
  const cartItem = await CartItem.findOneAndUpdate(
    {
      _id: orderId,
      ordered: true,
      status: "pending",
      product: {
        $in: await Product.find({ user: sellerId }).select("_id"),
      },
    },
    { status },
    { new: true }
  );

  if (!cartItem) throw new AppError("Item not found", 404);

  return cartItem;
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

export const cancelOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderedCartItem = await sellerChangeOrderStatus(
      req.params.id,
      res.locals.user._id,
      "cancelled"
    );

    res.status(200).json({
      status: "success",
      data: {
        orderedCartItem,
      },
    });
  }
);

export const getSellerOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const features = new APIFeatures(
      CartItem.find({
        product: {
          $in: await Product.find({ user: userId }).select("_id"),
        },
      }),
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

export const redeemCouponOnCartItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponCode: code } = req.params;
    const userId = res.locals.user._id;

    const coupon = await couponModel.findOne({
      code,
      expireAt: { $gt: Date.now() },
    });
    if (!coupon) return next(new AppError("Invalid coupon code", 400));

    const cartItems = await CartItem.updateMany(
      {
        user: userId,
        ordered: { $ne: true },
        product: { $in: coupon.products },
        discount: { $lt: coupon.discount },
      },
      { discount: coupon.discount },
      { new: true }
    );

    //if (!cartItems.length) return next(new AppError("No items found", 404));

    res.status(200).json({
      status: "success",
      // length: cartItems.length,
      // data: {
      //   cartItems,
      //},
    });
  }
);

export const getRecentRevenueForSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const { days } = req.params;

    const endDate = new Date();
    const startDate = days
      ? new Date(new Date().setDate(endDate.getDate() - +days))
      : null;

    // Fetch product IDs first to ensure we have the correct product list
    const productIds = await Product.find({ user: userId }).select("_id");
    if (!productIds.length) {
      return res.status(404).json({
        status: "fail",
        message: "No products found for this user.",
      });
    }

    // Ensure date filtering covers the full day
    const stats = await CartItem.aggregate([
      {
        // Match ordered items and ensure the product is from this seller
        $match: {
          product: {
            $in: productIds.map((p) => p._id),
          },
          ordered: true,
          status: { $nin: ["pending", "cancelled"] },

          ...(days && {
            createdAt: {
              $gte: startDate,
              $lte: endDate, // Cover the full interval between start and end dates
            },
          }),
        },
      },
      {
        // Lookup the product details (price, discount) from the Product collection
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        // Unwind the productDetails array to simplify processing
        $unwind: "$productDetails",
      },
      {
        // Group by the createdAt date and calculate revenue for each day
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date only
          },
          totalRevenue: {
            $sum: {
              $add: [
                {
                  // First part: Calculate (price * (1 - discount)) * quantity
                  $multiply: [
                    {
                      $multiply: [
                        "$productDetails.price",
                        {
                          $subtract: [
                            1,
                            { $min: ["$productDetails.discount", 1] },
                          ], // Ensure discount is within 0-1
                        },
                      ],
                    },
                    { $max: ["$quantity", 0] }, // Ensure quantity is non-negative
                  ],
                },
                // Second part: Add the shipping cost (ensure shipping is non-negative)
                { $max: ["$productDetails.shipping", 0] },
              ],
            },
          },
        },
      },
      {
        // Sort results by date
        $sort: { "_id.date": 1 },
      },
    ]);

    // Modify the stats array to replace _id with date directly
    const modifiedStats = stats.map((stat) => ({
      date: stat._id.date,
      totalRevenue: stat.totalRevenue,
    }));

    // Return a response, including debugging details if no stats were found
    if (!modifiedStats.length) {
      return res.status(200).json({
        status: "success",
        message: "No sales data found in the given period.",
        data: {
          startDate: startDate ? startDate.toISOString().split("T")[0] : null,
          endDate: endDate.toISOString().split("T")[0],
          stats: modifiedStats,
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        startDate: startDate ? startDate.toISOString().split("T")[0] : null,
        endDate: endDate.toISOString().split("T")[0],
        stats: modifiedStats,
      },
    });
  }
);
