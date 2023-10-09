const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { schemaOptions } = require("./modelOptions");

const contactRequestSchema = new Schema(
    {
        sender: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        recipient: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    },
    schemaOptions
);

const ContactRequest = model("ContactRequest", contactRequestSchema);

module.exports = ContactRequest;
