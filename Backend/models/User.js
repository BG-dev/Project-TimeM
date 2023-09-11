const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
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
        contacts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
        boards: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Board",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};

const User = model("User", userSchema);

module.exports = User;
