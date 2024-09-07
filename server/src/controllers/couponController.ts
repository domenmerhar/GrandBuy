import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Coupon from "../models/couponModel";

export const getCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: "success" });
  }
);

export const addCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code, products, discount, expireAt } = req.body;

    console.log(req.body);

    const coupon = await Coupon.create({ code, products, discount, expireAt });

    res.status(201).json({ status: "success", data: { coupon } });
  }
);

export const updateCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: "success" });
  }
);

export const deleteCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: "success" });
  }
);

export const applyCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: "success" });
  }
);
