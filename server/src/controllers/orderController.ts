import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import Order from "../models/orderModel";
import path from "path";

export const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const ordersQuery = new APIFeatures(
      Order.find({ user: id }).populate({ path: "products.product" }),
      req.query
    );

    const orders = await ordersQuery.filter().sort().limitFields().paginate()
      .query;

    res
      .status(200)
      .json({ staus: "success", length: orders.length, data: { orders } });
  }
);

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateOrderStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getSellerOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
