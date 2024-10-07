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
import { validate } from "../utils/validate";
import { body, param } from "express-validator";

//TODO: Images
//TOOD: .md files

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(
    validate([
      body("name").isString().notEmpty(),
      body("price").isNumeric().notEmpty(),
      body("shipping").isNumeric().notEmpty(),
      body("discount").isInt({ min: 0, max: 100 }),
    ]),
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

productRouter
  .route("/seller/:sellerId")
  .get(validate([param("sellerId").isMongoId()]), getSellerProducts);

productRouter
  .route("/:productId")
  .get(
    validate([param("productId").isMongoId()]),
    saveUserToResponse,
    addToHistory,
    getProduct
  );

// productRouter
//   .route("/upload")
//   .post(
//     fileUpload({ createParentPath: true }),
//     filesPayloadExists,
//     fileExtLimiterArr("images", [".png", ".jpg", ".jpeg"]),
//     fileExtLimiterOne("description", [".md"]),
//     fileExtLimiterOne("coverImage", [".png", ".jpg", ".jpeg"]),
//     uploadProductFiles,
//     (req, res, next) => {
//       res.status(200).json({ status: "success" });
//     }
//   );

productRouter.use(protect);

productRouter
  .route("/:productId")
  .delete(
    validate([
      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID."),
    ]),
    restrictTo("admin", "seller"),
    discontinueProduct
  );

productRouter
  .route("/:productId/image/:imageName")
  .delete(
    validate([
      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID."),
      param("imageName")
        .isUUID()
        .withMessage("Please provide a valid imageName.")
        .notEmpty()
        .withMessage("Please provide an imageName."),
    ]),
    restrictTo("admin", "seller"),
    deleteImage
  );

productRouter
  .route("/:productId/description")
  .delete(
    validate([
      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID."),
    ]),
    restrictTo("admin", "seller"),
    deleteDescription
  );

//TODO: ADD ADMIN ROUTES

productRouter.use(restrictTo("seller"));

productRouter.route("/:productId").patch(
  validate([
    param("productId")
      .isMongoId()
      .withMessage("Please provide a valid product ID."),
    body("name")
      .isString()
      .withMessage("Please provide a valid name.")
      .optional(),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Please provide a valid price.")
      .optional(),
    body("shipping")
      .isFloat({ min: 0 })
      .withMessage("Please provide a valid shipping.")
      .optional(),
    body("imagesOld")
      .isArray()
      .withMessage("imagesOld must be an array.")
      .optional(),
    //body("discount").isInt({ min: 0, max: 100 }),
  ]),
  fileUpload({ createParentPath: true }),
  fileExtLimiterArr("images", [".png", ".jpg", ".jpeg"], true),
  fileExtLimiterOne("description", [".md"], true),
  fileExtLimiterOne("coverImage", [".png", ".jpg", ".jpeg"], true),
  updateProduct
);

productRouter
  .route("/:productId/images")
  .patch(
    validate([param("productId").isMongoId()]),
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
