import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Review from "../models/reviewModel";
import path from "path";

export const getProductReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: GET REVIEW STATS
    res.status(200).json({ message: "getProductReviews" });
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

    if (!reviews) return next(new Error("No reviews found"));

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
    const review = await Review.findById(req.params.id);

    if (!review) return next(new Error("Review not found"));

    if (review.likes.includes(res.locals.user._id))
      return next(new Error("You already liked this review"));

    review.likes.push(res.locals.user._id);

    await review.save();

    res.status(200).json({ status: "success", data: { review } });
  }
);

export const dislikeReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);

    if (!review) return next(new Error("Review not found"));

    const filtered = review.likes.filter(
      (id) => id.toString() !== res.locals.user._id.toString()
    );

    review.likes = filtered;

    await review.save();

    res.status(200).json({ status: "success", data: { review } });
  }
);
