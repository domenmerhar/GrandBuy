import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Review from "../models/reviewModel";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import APIFeatures from "../utils/ApiFeatures";

export const getProductReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const features = new APIFeatures(
      Review.find({ productId })
        .select("-__v -lastChanged -productId")
        .populate({ path: "userId", select: "username _id" }),
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
        $match: { productId: new mongoose.Types.ObjectId(productId) },
      },
      {
        $facet: {
          overallStats: [
            {
              $group: {
                _id: "$productId",
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

    const newReview = await Review.create({
      userId: res.locals.user._id,
      productId,
      review,
      rating,
    });

    res.status(201).json({ status: "success", data: newReview });
  }
);

export const getUserReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getUserReviews" });
  }
);

export const getMyReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find({ userId: res.locals.user._id }).populate(
      { path: "productId", select: "name -_id" }
    );

    if (!reviews) return next(new AppError("No reviews found", 404));

    res.status(200).json({ status: "success", data: { reviews } });
  }
);

export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "updateReview" });
  }
);

export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).json({ message: "deleteReview" });
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
