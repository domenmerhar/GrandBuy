import mongoose, { Schema } from "mongoose";

//TODO: Add Indexes
//TODO: response structure

const banSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  validUntil: {
    type: Date,
    validate: {
      validator: function (val: Date) {
        return val > new Date(Date.now());
      },
      message: "The validUntil date must be in the future.",
    },
    required: true,
  },

  message: {
    type: String,
    required: true,
    minLength: [1, "Please provide a message with at least 1 character."],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

banSchema.set("toJSON", {
  versionKey: false,

  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

banSchema.set("toObject", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("Ban", banSchema);
