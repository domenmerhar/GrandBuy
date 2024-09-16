import express from "express";
import fileUpload from "express-fileupload";
import {
  addImages,
  createProduct,
  deleteDescription,
  deleteImage,
  discontinueProduct,
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
import { addToHistory } from "../controllers/historyItemController";
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

productRouter.use(protect);

productRouter
  .route("/:productId")
  .delete(restrictTo("admin", "seller"), discontinueProduct);

productRouter
  .route("/:productId/image/:imageName")
  .delete(restrictTo("admin", "seller"), deleteImage);

productRouter
  .route("/:productId/description")
  .delete(restrictTo("admin", "seller"), deleteDescription);

//TODO: ADD ADMIN ROUTES

productRouter.use(restrictTo("seller"));

productRouter
  .route("/:productId")
  .patch(
    fileUpload({ createParentPath: true }),
    fileExtLimiterArr("images", [".png", ".jpg", ".jpeg"], true),
    fileExtLimiterOne("description", [".md"], true),
    fileExtLimiterOne("coverImage", [".png", ".jpg", ".jpeg"], true),
    updateProduct
  );

productRouter
  .route("/:productId/images")
  .patch(
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiterArr("images", [".png", ".jpg", ".jpeg"]),
    addImages
  );

//.post(updateDescription);

// productRouter
//   .route("/:productId/cover-image")
//   .post(addCoverImage)
//   .delete(deleteCoverImage);

export default productRouter;
