import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Review from "../models/reviewModel";
import AppError from "../utils/AppError";
import Reply from "../models/replyModel";

//TODO: Data sanitization

export const getReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const reply = await Reply.findById(id);
    if (!reply) return next(new AppError("Reply not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        reply,
      },
    });
  }
);

export const getPostReplies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Get post replies",
      },
    });
  }
);

export const createReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const userId = res.locals.user.id;
    const { reply: replyText } = req.body;

    const validReview = await Review.findById(reviewId);
    if (!validReview) return next(new AppError("Review not found", 404));

    const reply = await Reply.create({
      user: userId,
      review: reviewId,
      reply: replyText,
    });

    res.status(200).json({
      status: "success",
      data: {
        reply,
      },
    });
  }
);

export const deleteReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const reply = await Reply.findOneAndUpdate(
      {
        user: userId,
        _id: id,
      },
      {
        user: null,
        reply: "Deleted",
      },
      { new: true }
    );

    if (!reply) return next(new AppError("Reply not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        reply,
      },
    });
  }
);
