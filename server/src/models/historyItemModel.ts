import mongoose from "mongoose";

const historyItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("HistoryItem", historyItemSchema);
