import mongoose from "mongoose";

const digitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const DigitalModel = mongoose.model("Digital", digitalSchema);
export default DigitalModel; 