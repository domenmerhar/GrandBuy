import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    enum: ["message", "warning"],
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

  viewed: {
    type: Boolean,
    default: false,
  },
});

notificationSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

notificationSchema.set("toObject", {
  versionKey: false,
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    return ret;
  },
});

export default mongoose.model("Notification", notificationSchema);
