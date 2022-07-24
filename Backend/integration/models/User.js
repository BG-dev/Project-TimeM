const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const User = model("User", userSchema);

module.exports = User;
