import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import Order from "../models/orderModel";
import CartItem from "../models/cartItemModel";
import cartItemModel from "../models/cartItemModel";
import { stripe } from "../utils/stripe";
import mongoose from "mongoose";

const ordersPerRequest = 10;

export const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const ordersQuery = new APIFeatures(Order.find({ user: id }), req.query);

    const orders = await ordersQuery.filter().sort().limitFields().paginate()
      .query;

    if (!orders) return next(new AppError("No orders found.", 404));

    res
      .status(200)
      .json({ staus: "success", length: orders.length, data: { orders } });
  }
);

export const getUserOrdersCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user._id;

    const ordersQuery = new APIFeatures(Order.find({ user: id }), req.query);
    const ordersCount = await ordersQuery
      .filter()
      .sort()
      .query.countDocuments();

    res.status(200).json({ status: "success", data: { ordersCount } });
  }
);

//TODO: ADMIN CANT ORDER

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cartItems = req.body.cartItems.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    );
    const userId = new mongoose.Types.ObjectId(res.locals.user._id);
    const { email } = res.locals.user;

    const products = await CartItem.aggregate([
      {
        $match: {
          _id: {
            $in: cartItems,
          },
          user: new mongoose.Types.ObjectId(userId),
          ordered: { $ne: true },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          quantity: 1,
          product: 1,
          totalPrice: {
            $multiply: [
              "$totalPrice",
              { $subtract: [1, { $divide: ["$discount", 100] }] },
            ],
          },
        },
      },
    ]);

    console.log({ products });

    if (products.length !== cartItems.length)
      return next(new AppError("Please provide valid cart items.", 400));

    const order = await Order.create({
      user: userId,
      products,
      totalPrice: products.reduce(
        (acc, product) => acc + product.totalPrice * product.quantity,
        0
      ),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      client_reference_id: String(order._id),
      mode: "payment",
      locale: "auto",
      //TODO: SUCCESS URL
      //TODO: CANCEL URL
      success_url: "http://localhost:5173",
      cancel_url: "https://www.google.com",
      customer_email: email,

      line_items: products.map((product) => {
        return {
          price_data: {
            currency: "usd",
            unit_amount: (product.totalPrice * 100).toFixed(0),
            product_data: {
              name: product.name,
            },
          },
          quantity: product.quantity,
        };
      }),
    });

    await CartItem.updateMany({ _id: { $in: cartItems } }, { ordered: true });

    res.status(201).json({
      status: "success",
      data: { order },
      session: session.url,
    });
  }
);

export const confirmDelivery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: res.locals.user._id,
      status: { $in: ["pending", "shipped"] },
    });

    if (!order) return next(new AppError("Order not found.", 404));

    order.status = "delivered";
    order.deliveredAt = new Date();

    order.products = order?.products.map((product) => {
      product.status = "delivered";
      return product;
    });

    order.save();

    await Promise.all(
      order.products.map((product: any) => {
        const productId = product.product;

        return cartItemModel.findOneAndUpdate(
          { _id: productId },
          { status: "delivered" },
          { new: true }
        );
      })
    );

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

    const sellerOrders: unknown[] = [];
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
