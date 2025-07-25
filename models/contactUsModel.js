import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema({
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
    },
    language: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const contactus = mongoose.model("contactus", contactusSchema);
export default contactus;