import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide a product ID."],
  },

  rating: {
    type: Number,
    min: [1, "Please provide a rating higher than 1."],
    max: [5, "Please provide a rating lower than 5."],
    required: [true, "Please provide a rating."],
  },

  review: {
    type: String,
    minLength: [1, "Please provide a review with at least 1 character."],
    maxLength: [500, "Please provide a review shorter than 500 characters."],
    required: [true, "Please provide a review."],
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: [limitArray(1000), "Maximum number of likes (1000) exceeded."],
    },
  ],

  lastChange: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.pre("save", function (next) {
  this.lastChange = new Date();
  next();
});

reviewSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.index({ lastChange: 1 });
reviewSchema.index({ likes: 1, rating: 1 });

reviewSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

reviewSchema.set("toObject", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

function limitArray(limit: number) {
  return function (value: any[]) {
    return value.length <= limit;
  };
}

export default mongoose.model("Review", reviewSchema);
