import mongoose from "mongoose";

//TODO: Check error messages

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
    minLength: [1, "Please provide a reply with at least 1 character."],
    maxLength: [500, "Please provide a reply shorter than 500 characters."],
    required: [true, "Please provide a reply."],
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
