import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import cartItemModel from "../models/cartItemModel";
import orderModel from "../models/orderModel";
import AppError from "../utils/AppError";
import Refund from "../models/refundModel";

const refundPeriodDays = parseInt(process.env.REFUND_PERIOD_DAYS || "60", 10); // Default to 60 days
const refundPeriod = refundPeriodDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds

export const requestRefund = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;
    const { reason } = req.body;

    const cartItem = await cartItemModel
      .findOne({
        _id: id,
        user: userId,
        status: "delivered",
      })
      .select("_id");
    if (!cartItem)
      return next(new AppError("No cart item found with that ID", 404));

    const refundStartDate = new Date(Date.now() - refundPeriod);

    const order = await orderModel
      .findOne({
        user: userId,
        products: cartItem._id,
      })
      .select("createdAt");

    if (!order || order.createdAt < refundStartDate)
      return next(new AppError("You can't refund this item", 400));

    const refundRequest = await Refund.create({
      cartItemId: id,
      reason,
    });

    res.status(201).json({ status: "success", refundRequest });
  }
);
