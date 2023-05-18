const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    tags: [
      {
        text: String,
        color: String,
      },
    ],
    status: {
      type: String,
      require: true,
    },
    position: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    board: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Board",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;
