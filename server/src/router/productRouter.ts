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
  uploadProductFiles,
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
  .post(
    protect,
    restrictTo("seller"),
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiterArr("images", [".png", ".jpg", ".jpeg"]),
    fileExtLimiterOne("description", [".md"]),
    fileExtLimiterOne("coverImage", [".png", ".jpg", ".jpeg"]),
    uploadProductFiles,
    createProduct
  );

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
    fileExtLimiterArr("images", [".png", ".jpg", ".jpeg"]),
    fileExtLimiterOne("description", [".md"]),
    fileExtLimiterOne("coverImage", [".png", ".jpg", ".jpeg"]),
    uploadProductFiles,
    (req, res, next) => {
      res.status(200).json({ status: "success" });
    }
  );

export default productRouter;
