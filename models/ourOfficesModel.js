import mongoose from "mongoose";

const ourOfficeSchema = new mongoose.Schema({
    images: {
        type: [String],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
});

const OurOffice = mongoose.model("OurOffice", ourOfficeSchema);
export default OurOffice;