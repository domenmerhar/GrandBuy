import mongoose from "mongoose";

const isValidDiscount = (value: number) => value >= 0 && value <= 100;

const CouponSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],

  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: [20, "Code must be at most 20 characters"],
    minLength: [1, "Code must be at least 1 character"],
  },

  discount: {
    type: Number,
    required: true,
    validate: [isValidDiscount, "Discount must be between 0 and 100"],
  },

  expireAt: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return value > new Date();
      },
      message: "Expiration date must be in the future",
    },
  },
});

CouponSchema.pre("save", function (next) {
  this.products = Array.from(
    new Set(this.products.map((product) => product.toString()))
  ).map((id) => new mongoose.Types.ObjectId(id));

  next();
});

CouponSchema.index({ expireAt: 1, code: 1 });

CouponSchema.set("toJSON", {
  versionKey: false,
});

CouponSchema.set("toObject", {
  versionKey: false,
});

export default mongoose.model("Coupon", CouponSchema);
