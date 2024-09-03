import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID."],
  },
  productId: {
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
    },
  ],
  lastChange: {
    type: Date,
    default: Date.now(),
  },
});

//TODO: Test index
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);