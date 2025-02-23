import mongoose from "mongoose";

const wishListItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide a product ID."],
  },

  name: {
    type: String,
  },

  shipping: {
    type: Number,
  },

  discount: {
    type: Number,
  },

  totalPrice: {
    type: Number,
  },

  coverImage: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

wishListItemSchema.index({ user: 1, productId: 1 }, { unique: true });
wishListItemSchema.index({ createdAt: 1 });

wishListItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

wishListItemSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("WishListItem", wishListItemSchema);
