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

wishlistRouter.route("/:id").delete(removeFromWishlist);

wishlistRouter.route("/add/:productId").post(addToWishlist);

export default wishlistRouter;
