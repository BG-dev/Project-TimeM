const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Board = model("Board", boardSchema);

module.exports = Board;
