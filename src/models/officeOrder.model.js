import mongoose, { Schema } from "mongoose";

const officeOrderSchema = new Schema({
    Department: {
        type: String,
        required: true
    },
    Order_Ref_No: {
        type: Number,
        required: true
    },
    Order_Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Publishing_Date: {
        type: Date,
        default: Date.now,
        required: true
    },
    Document: {
        type: String,
        required: true
    }
});

export const OfficeOrder = mongoose.model('OfficeOrder', officeOrderSchema)