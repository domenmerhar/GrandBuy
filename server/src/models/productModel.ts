import mongoose from "mongoose";

//COVER IMAGE

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },
  name: {
    type: String,
    minLength: [1, "Please provide a name with at least 1 character."],
    maxLength: [50, "Please provide a name shorter than 50 characters."],
    required: [true, "Please provide a name."],
  },
  coverImage: {
    type: String,
    required: [true, "Please provide a cover image."],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    min: [0, "Please provide a price higher than 0."],
    max: [10000, "Please provide a price lower than 10000."],
    required: [true, "Please provide a price."],
  },
  shipping: {
    type: Number,
    min: [0, "Please provide a shipping higher than 0."],
    max: [10000, "Please provide a shipping lower than 10000."],
    required: [true, "Please provide a price."],
  },
  discount: {
    type: Number,
    min: [0, "Please provide a discount higher than 0."],
    max: [100, "Please provide a discount lower than 100."],
    default: 0,
  },
  totalPrice: {
    type: Number,
  },
  descriptionLink: {
    type: String,
    required: true,
  },
  lastChanged: {
    type: Date,
    default: Date.now(),
  },
});

ProductSchema.pre("save", function (next) {
  const discountMultiplier = (100 - (this?.discount ?? 0)) / 100;
  const shipping = this.shipping || 0;

  this.totalPrice = this.price * discountMultiplier + shipping;
  this.lastChanged = new Date();
  next();
});

ProductSchema.index({ user: 1, name: 1 }, { unique: true });
ProductSchema.index({ name: 1 });
ProductSchema.index({ totalPrice: 1 });

ProductSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

ProductSchema.set("toObject", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("Product", ProductSchema);
