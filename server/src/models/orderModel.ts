import mongoose, { Schema } from "mongoose";

const dateInFuture = (val: Date) => {
  return val > new Date();
};

const orderSchema = new Schema({
  status: {
    type: String,
    enum: {
      values: ["Shipped", "Delivered"],
      message: "Please provide a valid status.",
    },
    default: "Shipped",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
        required: [true, "Please provide a cart item ID."],
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: [true, "Please provide a total price."],
  },

  estimatedDelivery: {
    type: Date,
    required: [true, "Please provide an estimated delivery date."],
    validate: [dateInFuture, "Please provide a date in the future."],
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
