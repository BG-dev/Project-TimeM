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
        author: {
            type: String,
            required: true,
        },
        color: {
            name: String,
            value: String,
        },
        users: [
            {
                type: {
                    user: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: "User",
                    },
                    role: String,
                },
                default: [],
            },
        ],
        lists: { type: [String], default: ["To Do", "Doing", "Done"] },
    },
    {
        timestamps: true,
    }
);

const Board = model("Board", boardSchema);

module.exports = Board;
