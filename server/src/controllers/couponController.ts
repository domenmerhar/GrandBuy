import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Coupon from "../models/couponModel";
import AppError from "../utils/AppError";
import CartItem from "../models/cartItemModel";
import productModel from "../models/productModel";
import { mapProductIds } from "../utils/mapProductIds";

export const getCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: "success" });
  }
);

export const addCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code, products, discount, expireAt } = req.body;

    const coupon = await Coupon.create({ code, products, discount, expireAt });

    res.status(201).json({ status: "success", data: { coupon } });
  }
);

export const updateCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { products, expireAt, discount } = req.body;

    const coupon = await Coupon.findOne({ _id: id });

    if (!coupon) return next(new AppError("Coupon not found.", 404));

    coupon.products = [...coupon.products, ...products];
    coupon.expireAt = expireAt;
    coupon.discount = discount;

    await coupon.save();

    res.status(200).json({ status: "success", data: { coupon } });
  }
);

export const deleteCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) return next(new AppError("Coupon not found.", 404));

    res.status(204).json({ status: "success", data: null });
  }
);

//TODO: Compare with item discount
export const applyCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponCode } = req.params;
    const id = res.locals.user._id;

    const coupon = await Coupon.findOne({
      code: couponCode,
      expireAt: { $gte: new Date() },
    });

    if (!coupon) return next(new AppError("Coupon not found.", 404));

    const result = await Promise.all(
      coupon.products.map((productId) =>
        CartItem.findOneAndUpdate(
          {
            user: id,
            product: productId,
            $or: [
              { discount: { $exists: false } },
              { discount: { $lt: coupon.discount } },
            ],
          },
          { discount: coupon.discount },
          { new: true }
        )
      )
    );

    const cartItems = result.filter((item) => item !== null);

    res.status(200).json({ status: "success", data: { cartItems } });
  }
);

export const createSellerCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { products, code, discount, expireAt } = req.body;
    const sellerId = res.locals.user._id;

    const productIds = await mapProductIds(
      await productModel
        .find({
          user: sellerId,
          name: { $in: products },
        })
        .select("_id")
    );

    if (expireAt < Date.now())
      return next(new AppError("Expiration date must be in the future", 400));

    const coupon = await Coupon.create({
      products: productIds,
      code,
      discount,
      expireAt,
    });

    res.status(201).json({ status: "success", data: { coupon } });
  }
);
