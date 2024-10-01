// tenderUpload.model.js
import mongoose, { Schema } from "mongoose";

const tenderUploadSchema = new Schema({
    HeadLine: {
        type: String,
        required: true
    },
    Alias_Name1: {
        type: String,
        required: true
    },
    Alias_Name2: {
        type: String
        
    },
    Alias_Name3: {
        type: String

    },
    Publishing_Date: {
        type: Date,
        default: Date.now,
        required: true
    },
    Closing_Date: {
        type: Date,
        required: true
    }
});



export const TenderUpload = mongoose.model('TenderUpload', tenderUploadSchema);
