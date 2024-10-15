import mongoose, { Schema } from "mongoose";

const atcTtcSchema = new Schema({
    MonthYear: {
        type: String,
        required: true
    },
    ATC: {
        type: Number,
        required: true,
        min: 0
    },
    TTC: {
        type: Number,
        required: true,
        min: 0
    },
    TransmissionConstraintAssumptions: {
        type: String,
        required: true
    }
});

export const AtcTtc = mongoose.model('AtcTtc', atcTtcSchema)