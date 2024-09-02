import mongoose from "mongoose";

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

ProductSchema.virtual("averageRating");

//TODO: ADD INDEX

export default mongoose.model("Product", ProductSchema);
