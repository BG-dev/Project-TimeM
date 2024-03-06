const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { schemaOptions } = require('./modelOptions');

const boardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        authorName: {
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
                        ref: 'User',
                    },
                    role: String,
                },
                default: [],
            },
        ],
    },
    schemaOptions,
);

const Board = model('Board', boardSchema);

module.exports = Board;
