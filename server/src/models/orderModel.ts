import mongoose, { Schema, Types } from "mongoose";

const dateInFuture = (val: Date) => {
  return val > new Date();
};

interface Order {
  user: Types.ObjectId;
  products: {
    name: string;
    image: string;
    totalPrice: number;
    quantity: number;
    status: ["pending", "cancelled", "shipped", "delivered", "refunded"];
  }[];
  totalPrice: number;
  status: "pending" | "cancelled" | "shipped" | "delivered";
  estimatedDelivery?: Date;
  createdAt?: Date;
  deliveredAt?: Date;
  paid: boolean;
}

const orderSchema = new Schema<Order>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },

  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
        required: [true, "Please provide a cart item ID."],
      },

      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide a product ID."],
      },

      name: {
        type: String,
        required: [true, "Please provide a product name."],
      },

      image: {
        type: String,
        required: [true, "Please provide a product image."],
      },

      totalPrice: {
        type: Number,
        required: [true, "Please provide a total price."],
      },

      quantity: {
        type: Number,
        min: [1, "Quantity must be at least 1"],
        required: [true, "Please provide a quantity."],
      },

      status: {
        type: String,
        enum: {
          values: ["pending", "cancelled", "shipped", "delivered", "refunded"],
          message: "Please provide a valid status.",
        },

        default: "pending",
      },
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
