import mongoose from "mongoose";

const wishListItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide a product ID."],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

wishListItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

wishListItemSchema.set("toJSON", { virtuals: true });
wishListItemSchema.set("toObject", { virtuals: true });

export default mongoose.model("WishListItem", wishListItemSchema);
