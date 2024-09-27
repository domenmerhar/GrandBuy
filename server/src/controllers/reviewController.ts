import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Review from "../models/reviewModel";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import APIFeatures from "../utils/ApiFeatures";
import Product from "../models/productModel";
import Order from "../models/orderModel";
import replyModel from "../models/replyModel";
import Notification from "../models/notificationModel";
import Cart from "../models/cartItemModel";

export const getProductReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const features = new APIFeatures(
      Review.find({ product: productId })
        .select("-__v -lastChanged -product")
        .populate({ path: "user", select: "username _id" }),
      req.query
    )
      .filter()
      .paginate()
      .sort();

    const reviews = await features.query;

    if (!reviews) return next(new AppError("No reviews found", 404));

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  }
);

export const getProductReviewStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const stats = await Review.aggregate([
      {
        $match: { product: new mongoose.Types.ObjectId(productId) },
      },
      {
        $facet: {
          overallStats: [
            {
              $group: {
                _id: "$product",
                avgRating: { $avg: "$rating" },
                numRatings: { $sum: 1 },
              },
            },
          ],
          ratingBreakdown: [
            {
              $group: {
                _id: "$rating",
                count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
            {
              $group: {
                _id: null,
                breakdown: { $push: { rating: "$_id", count: "$count" } },
                total: { $sum: "$count" },
              },
            },
            {
              $unwind: "$breakdown",
            },
            {
              $project: {
                _id: 0,
                rating: "$breakdown.rating",
                count: "$breakdown.count",
                percentage: {
                  $round: [
                    {
                      $multiply: [
                        { $divide: ["$breakdown.count", "$total"] },
                        100,
                      ],
                    },
                    0,
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          overallStats: { $arrayElemAt: ["$overallStats", 0] },
          ratingBreakdown: 1,
        },
      },
    ]);

    if (!stats || !stats.length || !stats[0].overallStats) {
      return next(new AppError("No reviews found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        overallStats: stats[0].overallStats,
        ratingBreakdown: stats[0].ratingBreakdown,
      },
    });
  }
);

export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, review } = req.body;
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const cartItem = await Cart.findOne({
      product: productId,
      user: userId,
      ordered: true,
    });

    if (!cartItem)
      return next(new AppError("You haven't bought this product", 400));

    const order = await Order.findOne({
      user: userId,
      status: "delivered",
      products: { $in: cartItem._id },
    });

    if (!order)
      return next(new AppError("You haven't bought this product", 400));

    const product = await Product.findOne({ _id: productId });
    if (!product) return next(new AppError("Product not found", 404));

    const newReview = await Review.create({
      user: res.locals.user._id,
      product: productId,
      review,
      rating,
    });

    res.status(201).json({ status: "success", data: newReview });
  }
);

export const getUserReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const reviews = await Review.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: { "user.role": "user" },
      },
      {
        $project: {
          _id: 1,
          product: 1,
          rating: 1,
          review: 1,
          likes: 1,
          likesCount: 1,
          lastChange: 1,
          user: { _id: 1, role: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  }
);

export const getMyReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find({ user: res.locals.user._id }).populate({
      path: "product",
      select:
        "-id -user -images -price -shipping -descriptionLink -lastChanged -totalPrice",
    });

    if (!reviews) return next(new AppError("No reviews found", 404));

    res.status(200).json({ status: "success", data: { reviews } });
  }
);

export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { rating, review: reviewText } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: id, user: res.locals.user._id },
      { rating, review: reviewText },
      { new: true }
    );

    if (!review) return next(new AppError("Review not found.", 404));

    res.status(200).json({ status: "success", data: { review } });
  }
);

export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;
    const { warningMessage } = req.body;

    const review = await Review.findOneAndDelete({
      _id: id,
    }).populate({ path: "product", select: "name" });

    if (!review) return next(new AppError("Review not found.", 404));

    await replyModel.deleteMany({ review: id });

    await Notification.create({
      user: review.user,
      createdBy: userId,
      type: "warning",
      message: `Your review on product ${review.product.name || "unknown"} has been deleted. ${warningMessage || ""}`,
    });

    res.status(204).json({ status: "success" });
  }
);

export const deleteReviewUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user._id;

    const review = await Review.findOneAndUpdate(
      { _id: id, user: userId },
      { review: "This review has been deleted." },
      { new: true }
    );

    if (!review) return next(new AppError("Review not found.", 404));

    res.status(200).json({ status: "success", data: { review } });
  }
);

export const likeReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, likes: { $ne: res.locals.user._id } },
      { $push: { likes: res.locals.user._id } },
      { new: true }
    );

    if (!review) {
      return next(
        new AppError("Review not found or you already liked this review", 404)
      );
    }

    res.status(200).json({ status: "success", data: { review } });
  }
);

export const dislikeReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, likes: res.locals.user._id },
      { $pull: { likes: res.locals.user._id } },
      { new: true }
    );

    if (!review) {
      return next(
        new AppError("Review not found or you haven't liked this review", 404)
      );
    }

    res.status(200).json({ status: "success", data: { review } });
  }
);

export const getRecentReviewsForSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals.user._id;
    const { days } = req.params;

    const endDate = new Date();
    const startDate = days
      ? new Date(new Date().setDate(endDate.getDate() - +days))
      : null;

    const reviews = await Review.aggregate([
      {
        $match: {
          "product.seller": userId,

          ...(days && {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          }),
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          reviews: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          reviews: 1,
        },
      },
      {
        $sort: { date: -1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: reviews,
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,
      endDate: endDate.toISOString().split("T")[0],
    });
  }
);
