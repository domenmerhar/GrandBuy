import mongoose from "mongoose";

const historyItemSchema = new mongoose.Schema({
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

  name: String,

  coverImage: String,

  discount: Number,

  totalPrice: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

historyItemSchema.index({ user: 1, product: 1 }, { unique: true });
historyItemSchema.index({ createdAt: 1, user: 1 });

historyItemSchema.set("toJSON", {
  versionKey: false,
});

historyItemSchema.set("toObject", {
  versionKey: false,
});

export default mongoose.model("HistoryItem", historyItemSchema);
