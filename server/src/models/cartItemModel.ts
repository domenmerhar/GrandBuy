import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  product: {
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
    default: 0,
  },

  status: {
    type: String,
    enum: {
      values: ["pending", "cancelled", "shipped", "delivered", "refunded"],
      message: "Please provide a valid status.",
    },
    default: "pending",
  },

  ordered: Boolean,
});

//CartItemSchema.index({ user: 1, product: 1 }, { unique: true });
CartItemSchema.index({ user: 1, createdAt: 1 });

CartItemSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name email image" });
  next();
});

CartItemSchema.set("toJSON", {
  versionKey: false,
});

CartItemSchema.set("toObject", {
  versionKey: false,
});

export default mongoose.model("CartItem", CartItemSchema);
