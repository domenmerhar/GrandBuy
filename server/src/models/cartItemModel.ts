import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    min: [1, "Quantity must be at least 1"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  discount: {
    type: Number,
    min: [0, "Discount must be at least 0"],
    max: [100, "Discount cannot exceed 100"],
  },
});

CartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });
CartItemSchema.index({ userId: 1, createdAt: 1 });

CartItemSchema.set("toJSON", {
  versionKey: false,
});

CartItemSchema.set("toObject", {
  versionKey: false,
});

export default mongoose.model("CartItem", CartItemSchema);