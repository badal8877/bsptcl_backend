import mongoose, {Schema} from "mongoose";

const noticeBoardSchema = new Schema ({
    Department: {
        type: String,
        required: true
    },
    HeadLine: {
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Document: {
        type: String,
        required: true
    },
    Publishing_Date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export const NoticeBoard = mongoose.model('NoticeBoard' , noticeBoardSchema);