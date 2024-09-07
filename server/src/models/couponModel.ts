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
  },

  discount: {
    type: Number,
    required: true,
    validate: [isValidDiscount, "Discount must be between 0 and 100"],
  },

  expireAt: {
    type: Date,
    required: true,
  },
});

CouponSchema.pre("save", function (next) {
  this.products = Array.from(
    new Set(this.products.map((product) => product.toString()))
  ).map((id) => new mongoose.Types.ObjectId(id));

  next();
});

CouponSchema.virtual("isExpired").get(function () {
  return this.expireAt < new Date();
});

CouponSchema.set("toJSON", { virtuals: true });
CouponSchema.set("toObject", { virtuals: true });

export default mongoose.model("Coupon", CouponSchema);
