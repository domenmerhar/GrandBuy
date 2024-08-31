import mongoose from "mongoose";
import { isEmail, isAlpha, isMobilePhone } from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: [true, "This username is already in use."],
    minLength: [4, "Please prvoide a username with at least 4 characters."],
    maxLength: [30, "Please provide a username shorter than 30 characters."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: [true, "This email is already in use."],
    validate: {
      validator: isEmail,
      message: "Please provide a valid email.",
    },
  },
  //CANNOT BE SET BY USER
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: [6, "Please provide a password with at least 6 characters."],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (val: string) {
        return val === (this as { password: string }).password;
      },
      message: "Passwords do not match.",
    },
  },
  firstName: {
    type: String,
    minLength: [2, "Please provide a first name with at least 2 characters."],
    maxLength: [20, "Please provide a first name shorter than 20 characters."],
    validate: {
      validator: isAlpha,
      message: "Please provide a valid first name.",
    },
  },
  lastName: {
    type: String,
    minLength: [2, "Please provide a last name with at least 2 characters."],
    maxLength: [20, "Please provide a last name shorter than 20 characters."],
    validate: {
      validator: isAlpha,
      message: "Please provide a valid last name.",
    },
  },
  street: {
    type: String,
    minLength: [5, "Please provide a street with at least 2 characters."],
    maxLength: [50, "Please provide a street shorter than 50 characters."],
  },
  city: {
    type: String,
    minLength: [2, "Please provide a city with at least 2 characters."],
    maxLength: [25, "Please provide a city shorter than 25 characters."],
  },
  zipCode: {
    type: String,
    minLength: [4, "Please provide a zip code with at least 4 characters."],
    maxLength: [10, "Please provide a zip code shorter than 10 characters."],
  },
  country: {
    type: String,
    minLength: [2, "Please provide a country with at least 2 characters."],
    maxLength: [28, "Please provide a country shorter than 28 characters."],
  },
  phoneNumber: {
    type: String,
    minLength: [5, "Please provide a phone number with at least 5 characters."],
    maxLength: [
      15,
      "Please provide a phone number shorter than 15 characters.",
    ],
    validate: {
      validator: isMobilePhone,
      message: "Please provide a valid phone number.",
    },
  },
});

export default mongoose.model("User", userSchema);
