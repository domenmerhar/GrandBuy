import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Coupon from "../models/couponModel";
import AppError from "../utils/AppError";

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
    const { id } = req.params;
    const { products, expireAt, discount } = req.body;

    const coupon = await Coupon.findOne({ _id: id });

    if (!coupon) return next(new AppError("Coupon not found", 404));

    coupon.products = [...coupon.products, ...products];
    coupon.expireAt = expireAt;
    coupon.discount = discount;

    await coupon.save();

    res.status(200).json({ status: "success", data: { coupon } });
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
