import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productModel";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/ApiFeatures";
import {
  deleteFile,
  saveFileToServer,
  saveImageToServer,
} from "./fileController";
import User from "../models/userModel";

const checkForUniqueName = async (name: string, userId: string) => {
  const productCheck = await Product.findOne({
    user: userId,
    name,
  });

  if (productCheck)
    throw new AppError("Product with this name already exists", 400);
};

const findMyProduct = async (productId: string, userId: string) => {
  const product = await Product.findOne({
    _id: productId,
    isSelling: { $ne: false },
    user: { _id: userId },
  });
  if (!product) throw new AppError("Product not found", 404);

  return product;
};

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findOne({
      _id: productId,
      isSelling: { $ne: false },
    });

    if (!product) return next(new AppError("Product not found", 404));

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(
      Product.find({ isSelling: { $ne: false } }),
      req.query
    );

    const products = await features
      .filter()
      .sort()
      .paginate()
      .query.select("_id name coverImage totalPrice discount");

    if (products.length === 0) {
      return next(new AppError("No products found.", 404));
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

    await checkForUniqueName(name, userId);

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

export const uploadProductFiles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files;

    try {
      const filesImagesArr = !Array.isArray(files!.images)
        ? [files!.images]
        : files!.images;

      res.locals.productImages = await Promise.all(
        filesImagesArr.map((file) => saveImageToServer({ file }))
      );

      res.locals.descripiton = await saveFileToServer(files.description);
      res.locals.coverImage = await saveImageToServer({
        file: files.coverImage,
      });
    } catch (err) {
      return next(new AppError("Error uploading file", 500));
    }

    next();
  }
);

//TODO: DISCOUNT
export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { name, price, shipping, imagesOld } = req.body;
    const userId = res.locals.user._id;

    await checkForUniqueName(name, userId);

    const product = await Product.findOne({
      _id: productId,
      isSelling: { $ne: false },
      user: userId,
    });
    if (!product) return next(new AppError("Product not found", 404));

    if (imagesOld) {
      const imagesOldArr = !Array.isArray(imagesOld) ? [imagesOld] : imagesOld;
      await Promise.all(
        imagesOldArr.map((image) => {
          product.images = product.images.filter((img) => img !== image);
          return deleteFile(image);
        })
      );
    }

    if (req.files) {
      const files = req.files;

      if (files.images) {
        const filesImagesArr = !Array.isArray(files!.images)
          ? [files!.images]
          : files!.images;

        res.locals.productImages = await Promise.all(
          filesImagesArr.map((file) => saveImageToServer({ file }))
        );

        res.locals.productImages.forEach((image) => {
          product.images.push(image);
        });
      }

      if (files.description) {
        await deleteFile(product.description!);
        product.description = await saveFileToServer(files.description);
      }

      if (files.coverImage) {
        await deleteFile(product.coverImage);
        product.coverImage = saveImageToServer({
          file: files.coverImage,
          width: 500,
          height: 300,
        });
      }
    }

    product.name = name;
    product.price = price;
    product.shipping = shipping;
    product.save();

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const discontinueProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const { role, _id: userId } = res.locals.user;

    const findObj = {
      ...(role === "seller" && { user: userId }),
      _id: productId,
      isSelling: { $ne: false },
    };

    const product = await Product.findOneAndUpdate(
      findObj,
      { isSelling: false },
      { new: true }
    );
    if (!product) return next(new AppError("Product not found", 404));

    res.status(204).json({ status: "success" });
  }
);

//DELETE, UPDATE ADMIN

// export const deleteProduct = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { productId } = req.params;

//     const product = await Product.findOneAndUpdate(
//       { _id: productId, isSelling: { $ne: false } },
//       { isSelling: false }
//     );

//     if (!product) return next(new AppError("Product not found", 404));

//     await Promise.all(product.images.map((image) => deleteFile(image)));

//     await deleteFile(product.coverImage);
//     //await deleteFile(product.description);

//     res.status(204).json({ status: "success", data: null });
//   }
// );

export const getHighestDiscount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({
      discount: { $gt: 0 },
      isSelling: { $ne: false },
    })
      .sort({ discount: -1 })
      .limit(10)
      .select("-user -images -descriptionLink -lastChanged");

    res.status(200).json({ status: "success", data: { products } });
  }
);

export const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;

    const product = await Product.find({
      user: sellerId,
      isSelling: { $ne: false },
    }).select("-user -descriptionLink -id");

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
      product.images.push(saveImageToServer({ file }));
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
