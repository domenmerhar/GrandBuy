import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import Order from "../models/orderModel";
import CartItem from "../models/cartItemModel";
import productModel from "../models/productModel";
import cartItemModel from "../models/cartItemModel";
import Stripe from "stripe";
import userModel from "../models/userModel";
import { getSellerRecent5 } from "./cartController";

const ordersPerRequest = 10;

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

//TODO: ADMIN CANT ORDER

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItems } = req.body;
    const userId = res.locals.user._id;

    const user = await userModel.findOne({ _id: userId }).select("email");
    const cartItemsArray = !Array.isArray(cartItems) ? [cartItems] : cartItems;
    //TODO: FIND UNORDERED, FIND YOUR ITEMS
    const cartItemsRes = await CartItem.find({
      _id: { $in: cartItemsArray },
    }).populate({ path: "product", select: "price name" });

    console.log(String(cartItemsRes));

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      //TODO: SUCCESS URL
      success_url: "https://docs.stripe.com/keys",
      cancel_url: "https://www.google.com",
      customer_email: user!.email,
      //TODO: ADD ORDER ID
      client_reference_id: String(userId),
      line_items: cartItemsRes.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount:
            item.product.price * ((100 - item.discount) / 100) * item.quantity,
          product_data: {
            name: item.product.name,
          },
        },
        quantity: item.quantity,
      })),
    });

    // const items = await CartItem.find({
    //   _id: { $in: cartItemsArray },
    //   user: userId,
    // }).populate("product");

    // if (items.length !== cartItemsArray.length)
    //   return next(new AppError("Please provide valid cart items.", 400));

    // const order = await Order.create({
    //   user: userId,
    //   products: cartItemsArray,
    //   totalPrice: items.reduce((acc, item) => {
    //     const priceBeforeDiscount = item.product.price * item.quantity;
    //     const discount =
    //       1 -
    //       (item.discount > item.product.discount
    //         ? item.discount
    //         : item.product.discount) /
    //         100;
    //     const totalPrice = priceBeforeDiscount * discount;

    //     return acc + totalPrice;
    //   }, 0),
    // });

    // await CartItem.updateMany(
    //   { _id: { $in: cartItemsArray } },
    //   { ordered: true }
    // );

    // await Promise.all(
    //   items.map((item) =>
    //     productModel.findByIdAndUpdate(item.product, {
    //       $inc: { orders: item.quantity },
    //     })
    //   )
    // );

    res.status(201).json({
      status: "success",
      //data: { order }
      session,
    });
  }
);

export const confirmDelivery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await Order.findOneAndUpdate(
      { _id: id, user: res.locals.user._id },
      { status: "delivered", deliveredAt: Date.now() },
      { new: true }
    ).select("products");

    if (!order) return next(new AppError("Order not found.", 404));

    const updated = await Promise.all(
      order.products.map((product: any) => {
        const productId = product.toString();
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
