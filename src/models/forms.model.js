import mongoose, {Schema} from "mongoose";

const formSchema = new Schema({
    Form_Title: {
        type: String,
        required: true
    },
    Description:{
        type:String,
        required:true
    },
    Document:{
        type:String,
        required: true
    }

});

export const Forms = mongoose.model('Forms',formSchema)