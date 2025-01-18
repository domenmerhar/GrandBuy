import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getWishlist,
  getWishlistItemByProductID,
  addToWishlist,
  removeFromWishlist,
  removeFromWishlistWithProductId,
} from "../controllers/wishlistItemController";
import { validate } from "../utils/validate";
import { param } from "express-validator";

const wishlistRouter = express.Router();

wishlistRouter.use(protect, restrictTo("user"));

wishlistRouter.route("/").get(getWishlist);

wishlistRouter.route("/:id").delete(
  validate([
    param("id")
      .isMongoId()
      .withMessage("Please provide a valid ID.")
      .notEmpty()
      .withMessage("Please provide an ID."),
  ]),

  removeFromWishlist
);

wishlistRouter
  .route("/product/:productId")
  .get(
    validate([
      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID.")
        .notEmpty()
        .withMessage("Please provide a product ID."),
    ]),

    getWishlistItemByProductID
  )
  .post(
    validate([
      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID.")
        .notEmpty()
        .withMessage("Please provide a product ID."),
    ]),

    addToWishlist
  )
  .delete(
    validate([
      param("productId")
        .isMongoId()
        .withMessage("Please provide a valid product ID.")
        .notEmpty()
        .withMessage("Please provide a product ID."),
    ]),

    removeFromWishlistWithProductId
  );

export default wishlistRouter;
