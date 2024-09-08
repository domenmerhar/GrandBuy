import mongoose from "mongoose";

const historyItemSchema = new mongoose.Schema({
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

historyItemSchema.index({ userId: 1, productId: 1 }, { unique: true });
historyItemSchema.index({ createdAt: 1, userId: 1 });

historyItemSchema.set("toJSON", {
  versionKey: false,
});

historyItemSchema.set("toObject", {
  versionKey: false,
});

export default mongoose.model("HistoryItem", historyItemSchema);
