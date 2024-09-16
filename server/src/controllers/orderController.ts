import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import Order from "../models/orderModel";
import CartItem from "../models/cartItemModel";

const ordersPerRequest = 10;

//TODO: Test

export const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const ordersQuery = new APIFeatures(
      Order.find({ user: id }).populate({
        path: "products",
        populate: {
          path: "product",
          select: "_id name",
        },
      }),
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
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItems } = req.body;
    const userId = res.locals.user._id;

    const cartItemsArray = !Array.isArray(cartItems) ? [cartItems] : cartItems;

    const items = await CartItem.find({
      _id: { $in: cartItemsArray },
      user: userId,
    }).populate("product");

    if (items.length !== cartItemsArray.length)
      return next(new AppError("Please provide valid cart items.", 400));

    const order = await Order.create({
      user: userId,
      products: cartItemsArray,
      totalPrice: items.reduce((acc, item) => {
        const priceBeforeDiscount = item.product.price * item.quantity;
        const discount =
          1 -
          (item.discount > item.product.discount
            ? item.discount
            : item.product.discount) /
            100;
        const totalPrice = priceBeforeDiscount * discount;

        return acc + totalPrice;
      }, 0),
    });

    await CartItem.updateMany(
      { _id: { $in: cartItemsArray } },
      { ordered: true }
    );

    res.status(201).json({ status: "success", data: { order } });
  }
);

export const confirmDelivery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    console.log(id, res.locals.user._id);

    const order = await Order.findOneAndUpdate(
      { _id: id, user: res.locals.user._id },
      { status: "Delivered" },
      { new: true }
    );

    if (!order) return next(new AppError("Order not found.", 404));

    res.status(200).json({ status: "success", data: { order } });
  }
);

//TODO: API  Features
export const getSellerOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sellerId = res.locals.user._id;

    const limit = req.query.limit ? +req.query.limit : ordersPerRequest;
    const skip = req.query.page ? (+req.query.page - 1) * ordersPerRequest : 0;

    const sellerOrdersArr = await Order.find()
      .populate({
        path: "products",
        select: "quantity createdAt",
        populate: {
          path: "product",
          select: "_id user name coverImage totalPrice",
          match: { user: sellerId },
        },
      })
      .select("products -_id")
      .sort({ products: -1 })
      .limit(limit)
      .skip(skip);

    if (!sellerOrdersArr.length)
      return next(new AppError("No orders found.", 404));

    const sellerOrders = [];
    for (let i = 0; i < sellerOrdersArr.length; i++) {
      const order = sellerOrdersArr[i];
      await new Promise<void>((resolve) => {
        setImmediate(() => {
          sellerOrders.push(order.products);
          resolve();
        });
      });
    }

    res.status(200).json({
      status: "success",
      length: sellerOrders.length,
      data: { sellerOrders: [...sellerOrders] },
    });
  }
);
