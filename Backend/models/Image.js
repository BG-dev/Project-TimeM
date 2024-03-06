const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { schemaOptions } = require('./modelOptions');

const imageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: Buffer,
            contentType: String,
        },
    },
    schemaOptions,
);

const Image = model('Image', imageSchema);

module.exports = Image;
