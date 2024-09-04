import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistItemController";

const wishlistRouter = express.Router();

wishlistRouter.use(protect, restrictTo("user"));

wishlistRouter.route("/").get(getWishlist);

wishlistRouter
  .route("/:productId")
  .post(addToWishlist)
  .delete(removeFromWishlist);

export default wishlistRouter;
