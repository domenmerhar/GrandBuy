import mongoose from "mongoose";

//COVER IMAGE

const ProductSchema = new mongoose.Schema({
  userId: {
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
    validate: {
      validator: (val: string) => +val >= 0 && +val <= 10000,
    },
    required: [true, "Please provide a price."],
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
  this.lastChanged = new Date();
  next();
});

ProductSchema.pre(/^find/, function (next) {
  const doc = this as mongoose.Query<
    Document[],
    Document,
    unknown,
    unknown,
    "find",
    Record<string, never>
  >;

  doc.select("-__v");

  next();
});

ProductSchema.index({ userId: 1, name: 1 }, { unique: true });
ProductSchema.index({ name: 1 });

//TODO: ADD INDEX

ProductSchema.virtual("totalPrice").get(function () {
  return this.price + (this.shipping || 0);
});

ProductSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,
});

ProductSchema.set("toObject", {
  versionKey: false,
  virtuals: true,
});

export default mongoose.model("Product", ProductSchema);
