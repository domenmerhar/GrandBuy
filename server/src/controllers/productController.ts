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
import { UploadedFile } from "express-fileupload";
import path from "path";

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

  await product.getOrdersAndAverageRating();

  return product;
};

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findOne({
      _id: productId,
      isSelling: { $ne: false },
    }).populate({ path: "user", select: "username _id" });

    if (!product) return next(new AppError("Product not found", 404));

    await product.getOrdersAndAverageRating();

    res.status(200).json({ status: "success", data: { product } });
  }
);

export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, averageRating, sort } = req.query;

    let query = Product.find({ isSelling: { $ne: false } });

    if (search && String(search).trim().length > 0)
      query = query.find({ name: { $regex: search, $options: "i" } });

    const features = new APIFeatures(query, req.query, [
      "search",
      "averageRating",
    ]);

    let products = features.paginate().filter();

    products = sort && sort?.includes("orders") ? products : products.sort();

    products = await products.query.select(
      "_id name coverImage totalPrice discount"
    );

    await Promise.all(
      products.map((product) => product.getOrdersAndAverageRating())
    );

    if (averageRating)
      products = products.filter(
        (prod) => prod.averageRating >= Number(averageRating)
      );

    if (products.length === 0) {
      return next(new AppError("No products found.", 404));
    }

    if (sort === "-orders") products.sort((a, b) => b.orders - a.orders);
    else if (sort === "+orders") products.sort((a, b) => a.orders - b.orders);

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
      price: price.toFixed(2),
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

      res.locals.descripiton = await saveFileToServer(
        files?.description as UploadedFile
      );
      res.locals.coverImage = await saveImageToServer({
        file: files?.coverImage as UploadedFile,
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

        res.locals.productImages.forEach((image: string) => {
          product.images.push(image);
        });
      }

      if (files.description) {
        await deleteFile(product.description!);
        product.description = await saveFileToServer(
          files.description as UploadedFile
        );
      }

      if (files.coverImage) {
        await deleteFile(product.coverImage);
        product.coverImage = await saveImageToServer({
          file: files.coverImage as UploadedFile,
          width: 500,
          height: 300,
        });
      }
    }

    product.name = name;
    product.price = price;
    product.shipping = shipping;
    product.save();

    await product.getOrdersAndAverageRating();

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

    await Promise.all(
      products.map((product) => product.getOrdersAndAverageRating())
    );

    res.status(200).json({ status: "success", data: { products } });
  }
);

export const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;

    const features = new APIFeatures(
      Product.find({
        user: sellerId,
        isSelling: { $ne: false },
      }).select("-user -descriptionLink -id"),
      req.query
    );

    const products = await features.paginate().query;

    if (!products.length) return next(new AppError("No products found.", 404));

    await Promise.all(
      products.map((product) => product.getOrdersAndAverageRating())
    );

    res
      .status(200)
      .json({ status: "success", length: products.length, data: { products } });
  }
);

export const getSellerProductList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;

    const features = new APIFeatures(
      Product.find({
        user: sellerId,
        isSelling: { $ne: false },
      })
        .select("name _id")
        .sort({ name: 1 }),
      req.query
    );

    const products = await features.paginate().query;

    if (!products.length) return next(new AppError("No products found.", 404));

    res.status(200).json({ status: "success", data: { products } });
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

    await product.getOrdersAndAverageRating();

    res.status(203).json({ status: "success", data: { product } });
  }
);

export const addImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const files = req.files;
    const product = await findMyProduct(productId, userId);

    if (!files || !files.images) {
      return next(new AppError("No images provided", 400));
    }
    (files.images as UploadedFile[]).forEach(async (file) => {
      await product.images.push(await saveImageToServer({ file }));
    });

    await product.save();

    await product.getOrdersAndAverageRating();

    res.status(203).json({ status: "success", data: { product } });
  }
);

export const deleteDescription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;

    const product = await findMyProduct(productId, userId);

    if (product.description) await deleteFile(product.description);

    product.description = "";
    product.save();

    await product.getOrdersAndAverageRating();

    res.status(203).json({ status: "success", data: { product } });
  }
);
