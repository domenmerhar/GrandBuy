import mongoose, { mongo } from "mongoose";

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },

  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    require: true,
  },

  reply: {
    type: String,
    minLength: [1, "Please provide a review with at least 1 character."],
    maxLength: [500, "Please provide a review shorter than 500 characters."],
    required: [true, "Please provide a review."],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

replySchema.set("toJSON", {
  versionKey: false,

  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

replySchema.set("toObject", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("Reply", replySchema);
