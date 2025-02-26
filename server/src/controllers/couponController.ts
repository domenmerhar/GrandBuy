import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Coupon from "../models/couponModel";
import AppError from "../utils/AppError";
import CartItem from "../models/cartItemModel";
import Product from "../models/productModel";
import APIFeatures from "../utils/ApiFeatures";

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

    const productSet = new Set([...coupon.products, ...products]);

    coupon.products = [...productSet];
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
    const codeSanitised = String(code).toUpperCase();

    const sellerId = res.locals.user._id;

    if (expireAt < Date.now())
      return next(new AppError("Expiration date must be in the future", 400));

    const productIds = await Product.find({
      _id: { $in: products },
      user: sellerId,
    }).select("_id");

    if (products.length !== productIds.length)
      return next(new AppError("Please enter your products", 400));

    const coupon = await Coupon.create({
      products: productIds.map((product) => product._id),
      code: codeSanitised,
      discount,
      expireAt,
      createdBy: sellerId,
    });

    res.status(201).json({ status: "success", data: { coupon } });
  }
);

export const getCouponSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sellerId = res.locals.user._id;

    const coupon = await Coupon.findOne({ _id: id, createdBy: sellerId });
    if (!coupon) return next(new AppError("Coupon not found.", 404));

    res.status(200).json({ status: "success", data: { coupon } });
  }
);

export const getSellerCoupons = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sellerId = res.locals.user._id;

    const features = new APIFeatures(
      Coupon.find({ createdBy: sellerId }).populate({
        path: "products",
        select: "name",
      }),
      req.query
    );
    const coupons = await features.sort().paginate().query;

    if (!coupons.length) return next(new AppError("No coupons found.", 404));

    res.status(200).json({ status: "success", data: { coupons } });
  }
);

export const getSellerCouponsCount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sellerId = res.locals.user._id;

    const couponsLength = await Coupon.find({
      createdBy: sellerId,
    }).countDocuments();

    res.status(200).json({ status: "success", data: { couponsLength } });
  }
);

export const getSellerCouponHighestDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sellerId = res.locals.user._id;

    const highestDiscount = await Coupon.find({
      createdBy: sellerId,
    })
      .sort({ discount: -1 })
      .limit(1)
      .select("discount -_id");

    if (!highestDiscount) return next(new AppError("No coupons found.", 404));

    res.status(200).json({ status: "success", data: { highestDiscount } });
  }
);

export const expireSellerCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sellerId = res.locals.user._id;

    const coupon = await Coupon.findOneAndUpdate(
      {
        _id: id,
        createdBy: sellerId,
      },
      { expireAt: Date.now() }
    );
    if (!coupon) return next(new AppError("Coupon not found.", 404));

    res.status(204).json({ status: "success", data: null });
  }
);

export const updateSellerCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sellerId = res.locals.user._id;
    const { products, expireAt, discount } = req.body;

    const coupon = await Coupon.findOne({ _id: id, createdBy: sellerId });
    if (!coupon) return next(new AppError("Coupon not found.", 404));

    const productIds = await Product.find({
      _id: { $in: products },
      user: sellerId,
    }).select("_id");

    if (products.length !== productIds.length)
      return next(new AppError("Please enter your products", 400));

    coupon.products = productIds.map((product) => product._id);
    if (coupon.expireAt) coupon.expireAt = expireAt;
    if (coupon.discount) coupon.discount = discount;

    await coupon.save();

    res.status(200).json({ status: "success", data: { coupon } });
  }
);
