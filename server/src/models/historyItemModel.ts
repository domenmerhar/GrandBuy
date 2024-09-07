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
    default: Date.now(),
  },
});

export default mongoose.model("HistoryItem", historyItemSchema);
