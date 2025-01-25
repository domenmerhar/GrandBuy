import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import CartItem from "../models/cartItemModel";
import APIFeatures from "../utils/ApiFeatures";
import Product from "../models/productModel";
import couponModel from "../models/couponModel";
import { mapProductIds } from "../utils/mapProductIds";
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

export const getCartItemsSummary = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return next(new AppError("Please provide valid cart items.", 400));
    }

    const pipeline = [
      // Step 1: Match documents based on user and cart items provided in the request
      {
        $match: {
          _id: {
            $in: cartItems.map((id: string) => new mongoose.Types.ObjectId(id)),
          },
          user: new mongoose.Types.ObjectId(userId),
          ordered: { $ne: true },
        },
      },

      // Step 2: Lookup product details to get the price
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      // Step 3: Unwind the product details array to simplify calculations
      {
        $unwind: "$productDetails",
      },

      // Step 4: Add calculated fields for basePrice, discountAmount, and totalPrice
      {
        $addFields: {
          basePrice: { $multiply: ["$productDetails.price", "$quantity"] }, // price * quantity
          discountAmount: {
            $multiply: [
              { $multiply: ["$productDetails.price", "$quantity"] },
              { $divide: ["$discount", 100] },
            ],
          },
          totalPrice: {
            $add: [
              {
                $multiply: [
                  { $multiply: ["$productDetails.price", "$quantity"] },
                  { $divide: [{ $subtract: [100, "$discount"] }, 100] },
                ],
              },
              "$shipping",
            ],
          },
        },
      },

      // Step 5: Group to calculate aggregate totals
      {
        $group: {
          _id: null,
          items: { $sum: "$basePrice" }, // Sum of price * quantity (base price)
          shipping: { $sum: "$shipping" }, // Total shipping costs
          discount: { $sum: "$discountAmount" }, // Total discount across all items
          total: { $sum: "$totalPrice" }, // Total price (basePrice after discount + shipping)
        },
      },

      // Step 6: Project the results for clean output
      {
        $project: {
          _id: 0,
          items: 1,
          shipping: 1,
          discount: 1,
          total: 1,
        },
      },
    ];

    // Execute the aggregation pipeline
    const result = await CartItem.aggregate(pipeline);

    if (result.length === 0) {
      return next(new AppError("No valid cart items found.", 400));
    }

    res.status(200).json({
      status: "success",
      data: result[0], // Return the first (and only) result of the aggregation
    });
  }
);

export const getCartItemCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const cartItems = await CartItem.countDocuments({
      user: userId,
      ordered: { $ne: true },
    });

    if (!cartItems) return next(new AppError("No items found", 404));

    res.status(200).json({
      status: "success",
      data: {
        cartItems,
      },
    });
  }
);

export const getCartItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const features = new APIFeatures(
      CartItem.find({ user: userId, ordered: { $ne: true } }),
      req.query
    );

    const cartItems = await features.paginate().sort().filter().query;

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
    const { cartItemId } = req.params;

    if (!quantity) {
      return next(new AppError("Quantity is required", 400));
    }

    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: cartItemId, ordered: { $ne: true } },
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
    } else {
      const product = await Product.findById(productId);

      res.locals.newItem = await CartItem.create({
        product: productId,
        quantity,
        user: userId,
        name: product.name,
        image: product.coverImage,
        price: product.price,
        discount: product.discount,
        shipping: product?.shipping,
        totalPrice: product.totalPrice,
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        item: res.locals.newItem,
      },
    });
  }
);

export const decrementCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItemId } = req.params;
    const userId = res.locals.user._id;

    const item = await CartItem.findOne({
      _id: cartItemId,
      user: userId,
      ordered: { $ne: true },
    });

    if (!item) return next(new AppError("Item not found", 404));

    if (item.quantity === 1) {
      return next(new AppError("Minimum quantity reached", 400));
    }

    item.quantity -= 1;
    await item.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      data: {
        item,
      },
    });
  }
);

export const incrementCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItemId } = req.params;
    const userId = res.locals.user._id;

    const item = await CartItem.findOneAndUpdate(
      {
        _id: cartItemId,
        user: userId,
        ordered: { $ne: true },
      },
      {
        $inc: { quantity: 1 },
      },
      { new: true }
    );

    if (!item) return next(new AppError("Item not found", 404));

    res.status(201).json({
      status: "success",
      data: {
        item,
      },
    });
  }
);

export const deleteCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItemId } = req.params;

    const deletedItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
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

    const productIds = await Product.find({ user: userId }).select("_id");
    if (!productIds.length) {
      return res.status(404).json({
        status: "fail",
        message: "No products found for this user.",
      });
    }

    const mappedProductIds = await mapProductIds(
      productIds as unknown as { _id: string }[]
    );

    const stats = await CartItem.aggregate([
      {
        $match: {
          product: {
            $in: mappedProductIds,
          },
          ordered: true,
          status: { $nin: ["pending", "cancelled"] },

          ...(days && {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          }),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date only
          },
          totalRevenue: {
            $sum: {
              $add: [
                {
                  $multiply: [
                    {
                      $multiply: [
                        "$productDetails.price",
                        {
                          $subtract: [
                            1,
                            { $min: ["$productDetails.discount", 1] },
                          ],
                        },
                      ],
                    },
                    { $max: ["$quantity", 0] },
                  ],
                },
                { $max: ["$productDetails.shipping", 0] },
              ],
            },
          },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ]);

    const modifiedStats = stats.map((stat) => ({
      date: stat._id.date,
      totalRevenue: stat.totalRevenue,
    }));

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

export const getSellerRecent5 = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const products = await Product.find({ user: userId }).select("_id");
    const productIds = await mapProductIds(
      products as unknown as { _id: string }[]
    );

    const cartItems = await CartItem.find({
      product: { $in: productIds },
      ordered: true,
      status: "pending",
    })
      .sort("-createdAt")
      .limit(5)
      .populate("product");

    res.status(200).json({
      status: "success",
      data: {
        cartItems,
      },
    });
  }
);
