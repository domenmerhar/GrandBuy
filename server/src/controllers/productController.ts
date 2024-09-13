import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productModel";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import { deleteFile, saveFileToServer } from "./fileController";
import User from "../models/userModel";

const findMyProduct = async (productId: string, userId: string) => {
  const product = await Product.findOne({
    _id: productId,
    user: { _id: userId },
  });
  if (!product) throw new AppError("Product not found", 404);

  return product;
};

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

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
      .query.select("_id name coverImage totalPrice discount");

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
    const { name, price, shipping, discount } = req.body;

    const user = await User.findById(userId).select("username _id");

    const product = await Product.create({
      name,
      coverImage: res.locals.coverImage,
      images: res.locals.productImages,
      price,
      shipping,
      description: res.locals.descripiton,
      user: user,
      discount,
    });

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const uploadProductFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files;
  res.locals.productImages = [];

  try {
    files.images.forEach((file) => {
      res.locals.productImages.push(saveFileToServer(file));
    });

    res.locals.descripiton = saveFileToServer(files.description);
    res.locals.coverImage = saveFileToServer(files.coverImage);
  } catch (err) {
    return next(new AppError("Error uploading file", 500));
  }

  next();
};

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

//DELETE, UPDATE ADMIN

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product) return next(new AppError("Product not found", 404));

    await Promise.all(product.images.map((image) => deleteFile(image)));

    await deleteFile(product.coverImage);
    await deleteFile(product.description);

    res.status(204).json({ status: "success", data: null });
  }
);

export const getHighestDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({ discount: { $gt: 0 } })
      .sort({ discount: -1 })
      .limit(10)
      .select("-user -images -descriptionLink -lastChanged");

    res.status(200).json({ status: "success", data: { products } });
  }
);

export const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;

    const product = await Product.find({ user: sellerId }).select(
      "-user -descriptionLink -id"
    );

    if (!product.length) return next(new AppError("No products found.", 404));

    res
      .status(200)
      .json({ status: "success", length: product.length, data: { product } });
  }
);

export const deleteImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, imageName } = req.params;
    const userId = res.locals.user._id;

    const product = await findMyProduct(productId, userId);

    product.images = product.images.filter((image) => image !== imageName);
    await product.save();

    await deleteFile(imageName);

    res.status(203).json({ status: "success", data: { product } });
  }
);

export const addImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const files = req.files;
    const product = await findMyProduct(productId, userId);

    files.images.forEach((file) => {
      product.images.push(saveFileToServer(file));
    });

    await product.save();

    res.status(203).json({ status: "success", data: { product } });
  }
);

export const deleteDescription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const product = await findMyProduct(productId, userId);

    await deleteFile(product.description);

    product.description = "";
    product.save();

    res.status(203).json({ status: "success", data: { product } });
  }
);
