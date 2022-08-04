const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
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
