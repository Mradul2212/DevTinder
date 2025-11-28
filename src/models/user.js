const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error(`Invalid email address: ${value}`);
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error(`Password is too weak: ${value}`);
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://as1.ftcdn.net/v2/jpg/14/38/38/96/1000_F_1438389663_GZqRIobnf4UL8NBwVGrbvTrqTtuPeKWl.jpg",
      validate(value) {
        if (!validator.isURL(value))
          throw new Error(`Invalid photoUrl: ${value}`);
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$2212", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const passwordHash = this.password;
  const isPasswordMatch = await bcrypt.compare(inputPassword, passwordHash);
  return isPasswordMatch;
};

module.exports = mongoose.model("User", userSchema);
