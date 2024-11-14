import mongoose, { Schema } from "mongoose";

const transferPostingSchema = new Schema({
    Department: {
        type: String,
        required: true
    },
    HeadLine: {
        type: String,
        required: true
    },
    Issue_Date: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Document: {
        type: String,
        required: true
    }
});

export const TransferPosting = mongoose.model('TransferPosting', transferPostingSchema)