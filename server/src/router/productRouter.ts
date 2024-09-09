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
import {
  fileExtLimiterArr,
  fileExtLimiterOne,
  filesPayloadExists,
} from "../controllers/fileController";

//TODO: Images
//TOOD: .md files

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
