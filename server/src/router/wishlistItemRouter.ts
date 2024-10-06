import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistItemController";
import { validate } from "../utils/validate";
import { param } from "express-validator";

const wishlistRouter = express.Router();

wishlistRouter.use(protect, restrictTo("user"));

wishlistRouter.route("/").get(getWishlist);

wishlistRouter
  .route("/:id")
  .delete(validate([param("id").isMongoId()]), removeFromWishlist);

wishlistRouter
  .route("/add/:productId")
  .post(validate([param("productId").isMongoId()]), addToWishlist);

export default wishlistRouter;
