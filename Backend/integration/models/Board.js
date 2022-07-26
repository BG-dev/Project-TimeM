const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    color: {
      name: String,
      value: String,
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User", default: [] }],
    lists: { type: [String], default: ["To Do", "Doing", "Done"] },
  },
  {
    timestamps: true,
  }
);

const Board = model("Board", boardSchema);

module.exports = Board;
