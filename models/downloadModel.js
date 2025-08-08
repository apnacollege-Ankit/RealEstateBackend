import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
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
    }
});

const Download = mongoose.model("Download", downloadSchema);
export default Download;