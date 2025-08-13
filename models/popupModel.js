import mongoose from "mongoose";

const popupSchema = new mongoose.Schema({
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
    lookingFor: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    }
});

const popupModel = mongoose.model("Popup", popupSchema);
export default popupModel;