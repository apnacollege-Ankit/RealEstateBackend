import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    bedrooms: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
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