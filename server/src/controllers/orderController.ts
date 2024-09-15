import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import Order from "../models/orderModel";

export const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const ordersQuery = new APIFeatures(
      Order.find({ user: id }).populate({ path: "products.product" }),
      req.query
    );

    const orders = await ordersQuery.filter().sort().limitFields().paginate()
      .query;

    if (!orders) return next(new AppError("No orders found.", 404));

    res
      .status(200)
      .json({ staus: "success", length: orders.length, data: { orders } });
  }
);

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const confirmDelivery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: id, user: res.locals.user._id },
      { status: "Delivered" },
      { new: true }
    );

    if (!order) return next(new AppError("Order not found.", 404));

    res.status(200).json({ status: "success", data: { order } });
  }
);

export const getSellerOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
