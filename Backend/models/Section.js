const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { schemaOptions } = require("./modelOptions");

const sectionSchema = new Schema(
    {
        status: {
            type: String,
            required: true,
        },
        position: {
            type: Number,
            required: true,
        },
        boardId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Board",
        },
    },
    schemaOptions
);

const Section = model("Section", sectionSchema);

module.exports = Section;
