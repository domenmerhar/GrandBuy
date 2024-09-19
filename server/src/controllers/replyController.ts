import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Review from "../models/reviewModel";
import AppError from "../utils/AppError";
import Reply from "../models/replyModel";

const pageSize = 5;

//TODO: Data sanitization

//TODO: Fix population
export const getReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const reply = await Reply.findById(id)
      .populate({
        path: "user",
        select: "username _id",
      })
      .populate({ path: "review" });
    if (!reply) return next(new AppError("Reply not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        reply,
      },
    });
  }
);

export const getReviewReplies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const { page: pageStr, skip: skipStr, limit: limitStr } = req.query;

    const page = parseInt((pageStr as string) ?? "1");
    const limit = parseInt((skipStr as string) ?? `${pageSize}`);
    const skip = (page - 1) * limit;

    const replies = await Reply.find({ review: reviewId })
      .sort("createdAt")
      .skip(skip)
      .limit(limit);

    if (!replies.length) return next(new AppError("No replies found", 404));

    const count = await Reply.countDocuments({ review: reviewId });

    res.status(200).json({
      status: "success",
      data: {
        replies,
        page,
        totalReplies: count,
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
