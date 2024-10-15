import mongoose, { Schema } from "mongoose";

const careerSchema = new Schema({
    Description: {
        type: String,
        required: true
    },
    Document: {
        type: String,
        required: true
    }

});

export const Career = mongoose.model('Career', careerSchema)