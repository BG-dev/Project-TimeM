const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { schemaOptions } = require("./modelOptions");

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
        position: {
            type: Number,
            require: true,
        },
        sectionId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Section",
        },
    },
    schemaOptions
);

const Task = model("Task", taskSchema);

module.exports = Task;
