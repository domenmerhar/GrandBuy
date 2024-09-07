import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productModel";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    console.log({ productId });

    const product = await Product.findById(productId);

    if (!product) return next(new AppError("Product not found", 404));

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(Product.find(), req.query);

    const products = await features
      .filter()
      .sort()
      .paginate()
      .query.select("_id name price coverImage");

    if (products.length === 0) {
      next(new AppError("No products found.", 404));
    }

    res.status(200).json({
      status: "success",
      length: products.length,
      data: { products },
    });
  }
);

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const { name, coverImage, images, price, shipping, descriptionLink } =
      req.body;

    const product = await Product.create({
      name,
      coverImage,
      images: images.split(","),
      price,
      shipping,
      descriptionLink,
      userId,
    });

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { name, images, price, shipping, descriptionLink } = req.body;

    const product = await Product.findById(productId);

    if (!product) return new AppError("Product not found", 404);

    product.name = name;
    product.images = images.split(",");
    product.price = price;
    product.shipping = shipping;
    product.descriptionLink = descriptionLink;

    product.save();

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    req.query;

    const product = await Product.findOneAndDelete({ _id: productId });

    console.log({ product });
    if (!product) return next(new AppError("Product not found", 404));

    res.status(204).json({ status: "success", data: null });
  }
);

export const getHighestDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find()
      .sort({ discount: -1 })
      .limit(10)
      .select("-userId -images -descriptionLink -lastChanged");

    res.status(200).json({ status: "success", data: { products } });
  }
);

export const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;

    const product = await Product.find({ userId: sellerId }).select(
      "-userId -descriptionLink"
    );
    if (!product.length) return next(new AppError("No products found.", 404));

    res
      .status(200)
      .json({ status: "success", length: product.length, data: { product } });
  }
);
