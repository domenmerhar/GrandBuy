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
    res.status(200).json({ message: "getMyReviews" });
  }
);

export const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getReview" });
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

// export const likeComment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     res.status(204).json({ message: "likeComment" });
//   }
// );

// export const dislikeComment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     res.status(204).json({ message: "dislikeComment" });
//   }
// );
