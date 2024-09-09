import express, { NextFunction } from "express";
import fileUpload from "express-fileupload";
import {
  createProduct,
  deleteProduct,
  getHighestDiscount,
  getProduct,
  getProducts,
  getSellerProducts,
  updateProduct,
} from "../controllers/productController";
import {
  protect,
  restrictTo,
  saveUserToResponse,
} from "../controllers/authController";
import {
  addToHistory,
  filterYourHistory,
} from "../controllers/historyItemController";
import AppError from "../utils/AppError";
import path from "path";

//TODO: Images
//TOOD: .md files

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req: Request, res: Response, next: NextFunction) => {
  const files = req.filterYourHistory;

  const filesOverLimit = [];

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(key);
    }
  });

  if (filesOverLimit.length) {
    return next(
      new AppError(
        `The following files are over the ${MB}MB limit: ${filesOverLimit.join(
          ", "
        )}`,
        400
      )
    );
  }

  next();
};

const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next(new AppError("No files were uploaded", 400));

  next();
};

const fileExtLimiter = (allowdExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    // Object.keys(files).forEach((key) => {
    //   fileExtensions.push(path.extname(files[key].name));
    // });

    files.images.forEach((file) => {
      fileExtensions.push(path.extname(file.name));
    });

    const allowed = fileExtensions.every((ext) => allowdExtArray.includes(ext));

    if (!allowed)
      return next(
        new AppError(
          "Only please provide a valid format files are allowed",
          400
        )
      );

    next();
  };
};

const fileExtLimiterOne =
  (location: string, allowdExtArray: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.files[location])
      return next(new AppError(`Please upload ${location}`, 400));

    const file = req.files[location];
    const fileExtensions: string = path.extname(file.name);

    const allowed = allowdExtArray.includes(fileExtensions);

    if (!allowed)
      return next(
        new AppError(
          `Please provide ${location} in one of the following formats: ${allowdExtArray.join(", ")}`,
          400
        )
      );

    next();
  };

const fileExtLimiterArr =
  (location: string, allowdExtArray: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.files[location])
      return next(new AppError(`Please upload ${location}`, 400));

    const fileArr = req.files[location];

    const fileExtensions: string[] = [];

    fileArr.forEach((file) => {
      fileExtensions.push(path.extname(file.name));
    });

    const allowed = fileExtensions.every((ext) => allowdExtArray.includes(ext));

    if (!allowed)
      return next(
        new AppError(
          `Please provide ${location} in one of the following formats: ${allowdExtArray.join(", ")}`,
          400
        )
      );

    next();
  };

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(protect, restrictTo("seller"), createProduct);

productRouter.route("/highest-discount").get(getHighestDiscount);

productRouter.route("/seller/:sellerId").get(getSellerProducts);

productRouter
  .route("/:productId")
  .get(saveUserToResponse, addToHistory, getProduct);

productRouter
  .route("/:productId")
  .patch(protect, restrictTo("seller"), updateProduct)
  .delete(protect, restrictTo("seller"), deleteProduct);

productRouter
  .route("/upload")
  .post(
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiterArr("images", [".png", ".jpg", ".jpeg", ".md"]),
    fileExtLimiterOne("description", [".md"]),
    (req, res, next) => {
      const files = req.files;

      files.images.forEach((file) => {
        const filepath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "files",
          file.name
        );

        file.mv(filepath, (err) => {
          if (err) return next(new AppError("Error uploading file", 500));
        });
      });

      const filePathDescription = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "files",
        files.description.name
      );

      files.description.mv(filePathDescription, (err) => {
        if (err) return next(new AppError("Error uploading file", 500));
      });

      res.status(200).json({ status: "success" });
    }
  );

export default productRouter;
