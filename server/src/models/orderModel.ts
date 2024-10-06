import mongoose, { Schema } from "mongoose";

const dateInFuture = (val: Date) => {
  return val > new Date();
};

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "CartItem",
      required: [true, "Please provide a cart item ID."],
    },
  ],

  totalPrice: {
    type: Number,
    required: [true, "Please provide a total price."],
  },

  status: {
    type: String,
    enum: {
      values: ["pending", "cancelled", "shipped", "delivered"],
      message: "Please provide a valid status.",
    },
    default: "pending",
  },

  estimatedDelivery: {
    type: Date,
    //required: [true, "Please provide an estimated delivery date."],
    validate: [dateInFuture, "Please provide a date in the future."],
    default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  deliveredAt: {
    type: Date,
  },

  paid: {
    type: Boolean,
    default: false,
  },
});

orderSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

orderSchema.set("toObject", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("Order", orderSchema);
