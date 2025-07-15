const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, // Ensure emailId is unique
      lowercase: true, // Store emailId in lowercase
      trim: true, // Remove whitespace from emailId
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
      min: 18, // Minimum age requirement
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoURL: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about of user!",
    },
    skills: {
      type: [String], // Array of strings for skills
      validate(value) {
        if (value.length > 5) {
          throw new Error("Skills array must not contain more than 10 skills");
        }
      },
    },
  },
  { timestamps: true }
);

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
