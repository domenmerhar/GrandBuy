import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productModel";

export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: SEARCH, FILTER, SORT, PAGINATION
    const products = await Product.find();

    res
      .status(200)
      .json({ status: "success", length: products.length, data: { products } });
  }
);

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;
    const { name, images, price, shipping, descriptionLink } = req.body;

    const product = await Product.create({
      name,
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
    res.status(200).json({ message: "updateProduct" });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "deleteProduct" });
  }
);

export const getHighestDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getReviews" });
  }
);

export const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "getSellerProducts" });
  }
);
