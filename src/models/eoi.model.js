import mongoose, { Schema } from "mongoose";

const eoiSchema = new Schema({
    Description: {
        type: String,
        required: true
    },
    Document: {
        type: String,
        required: true
    }

});

export const Eoi = mongoose.model('Eoi', eoiSchema)