import mongoose, { Schema } from "mongoose";

const RefundSchema = new Schema({
  cartItemId: {
    type: Schema.ObjectId,
    ref: "CartItem",
    required: true,
  },

  reason: {
    type: String,
    required: [true, "Please provide a reason for the refund"],
    minLength: [1, "Reason must be at least 1 character"],
    maxLength: [255, "Reason cannot exceed 255 characters"],
  },

  status: {
    type: String,
    enum: {
      values: ["pending", "approved", "rejected"],
      message: "Please provide a valid status.",
    },
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resolvedAt: {
    type: Date,
  },

  resolvedMessage: {
    type: String,
    minLength: [1, "Resolved message must be at least 1 character"],
    maxLength: [255, "Resolved message cannot exceed 255 characters"],
  },
});

RefundSchema.set("toJSON", {
  versionKey: false,
});

RefundSchema.set("toObject", {
  versionKey: false,
});

export default mongoose.model("Refund", RefundSchema);
