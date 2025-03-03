import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Review from "../models/reviewModel";
import AppError from "../utils/AppError";
import Reply from "../models/replyModel";
import APIFeatures from "../utils/ApiFeatures";

const pageSize = 5;

//TODO: Fix population
export const getReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const reply = await Reply.findById(id)
      .populate({
        path: "user",
        select: "username _id ",
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

    const page = parseInt(String(pageStr) ?? "1");
    const limit = parseInt(String(skipStr) ?? `${pageSize}`);
    const skip = (page - 1) * limit;

    const replies = await Reply.find({ review: reviewId })
      .populate({
        path: "user",
        select: "username _id ",
      })
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

export const getUserReplies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const replies = await new APIFeatures(
      Reply.find({ user: userId }),
      req.query
    )
      .paginate()
      .filter()
      .limitFields()
      .sort().query;

    if (!(replies as unknown as unknown[]).length)
      return next(new AppError("No replies found", 404));

    const count = await Reply.countDocuments({ user: userId });

    res.status(200).json({
      status: "success",
      data: {
        replies,
        totalReplies: count,
        page: parseInt((req.query.page as string) ?? "1"),
      },
    });
  }
);
