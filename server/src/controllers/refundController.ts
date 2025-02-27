import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import CartItem from "../models/cartItemModel";
import orderModel from "../models/orderModel";
import AppError from "../utils/AppError";
import Refund from "../models/refundModel";
import APIFeatures from "../utils/ApiFeatures";
import notificationModel from "../models/notificationModel";
import { ObjectId } from "mongoose";

const refundPeriodDays = parseInt(process.env.REFUND_PERIOD_DAYS || "60", 10); // Default to 60 days
const refundPeriod = refundPeriodDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds

export const requestRefund = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;
    const { reason } = req.body;

    const cartItem = await CartItem.findOne({
      _id: id,
      user: userId,
      status: "delivered",
    })
      .populate({ path: "product", select: "user" })
      .select("_id product");

    if (!cartItem)
      return next(new AppError("No cart item found with that ID", 404));

    const refundStartDate = new Date(Date.now() - refundPeriod);

    const order = await orderModel
      .findOne({
        user: userId,
        products: { $elemMatch: { _id: id } },
      })
      .select("createdAt products");

    if (!order?.createdAt || order.createdAt < refundStartDate)
      return next(new AppError("You can't refund this item", 400));

    const refundRequest = await Refund.create({
      cartItemId: id,
      reason,
      user: userId,
      seller: (cartItem.product as unknown as { user: ObjectId }).user,
    });

    cartItem.status = "pending-refund";
    await cartItem.save();

    order.products.forEach((product) => {
      if (product?._id?.toString() === id) product.status = "pending-refund";
    });

    await order.save();

    res.status(201).json({ status: "success", refundRequest });
  }
);

export const getMyRefunds = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const refunds = await new APIFeatures(
      Refund.find({
        user: userId,
      }).populate({ path: "cartItemId", select: "name quantity" }),

      req.query
    )
      .sort()
      .filter()
      .paginate().query;
    if (!refunds.length) return next(new AppError("No refunds found", 404));

    res
      .status(200)
      .json({ status: "success", data: { refunds }, length: refunds.length });
  }
);

export const getRefund = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;

    const refund = await Refund.find({ user: userId, _id: id });
    if (!refund.length)
      return next(new AppError("No refund found with that ID", 404));

    res.status(200).json({ status: "success", data: refund });
  }
);

// TODO: change status in order
export const cancelRefund = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;

    const refund = await Refund.findOneAndUpdate(
      {
        user: userId,
        _id: id,
        status: "pending",
      },
      { status: "cancelled" },
      { new: true }
    );
    if (!refund) return next(new AppError("No refund found with that ID", 404));

    const carItem = await CartItem.findOneAndUpdate(
      {
        _id: refund.cartItemId,
      },
      {
        status: "delivered",
      },
      { new: true }
    );

    res.status(200).json({ status: "success", data: refund });
  }
);

//TODO: send money back
export const respondToRefund = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;
    const { status, resolvedMessage } = req.body;

    const refund = await Refund.findOne({
      _id: id,
      seller: userId,
      status: "pending",
    });

    if (!refund) return next(new AppError("No refund found with that ID", 404));

    const order = await orderModel
      .findOne({
        user: refund.user,
        products: { $elemMatch: { _id: refund.cartItemId } },
      })
      .select("createdAt products");

    if (!order) return next(new AppError("No refund found with that ID", 404));

    const productIdString = refund.cartItemId.toString();
    order.products.forEach((product) => {
      if (product?._id?.toString() === productIdString)
        product.status = status === "approved" ? "refunded" : "delivered";
    });

    refund.status = status;

    const cartItem = await CartItem.findOne({
      _id: refund.cartItemId,
    });

    if (!cartItem)
      return next(new AppError("No refund found with that ID", 404));

    cartItem.status = status === "approved" ? "refunded" : "delivered";

    await notificationModel.create({
      user: refund.user,
      createdBy: userId,
      type: status === "approved" ? "message" : "warning",
      message: `Your refund request has been ${status} on product ${cartItem.name}. Reason: ${resolvedMessage}`,
    });

    await refund.save();
    await order.save();

    res.status(200).json({
      status: "success",
    });
  }
);

export const getSellerRefunds = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const refunds = await new APIFeatures(
      Refund.find({
        seller: userId,
      })
        .populate({ path: "cartItemId", select: "name quantity" })
        .populate({ path: "user", select: "username _id image" }),
      req.query
    )
      .sort()
      .filter()
      .paginate().query;
    if (!refunds.length) return next(new AppError("No refunds found", 404));

    res
      .status(200)
      .json({ status: "success", data: { refunds }, length: refunds.length });
  }
);
