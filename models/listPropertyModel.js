import mongoose from "mongoose";

const listPropertySchema = new mongoose.Schema({
    propertyType: {
        type: String,
        required: true
    },
    askingPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    bedrooms: {
        type: String,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    squareFootage: {
        type: String,
        required: true
    },
    propertyDescription: {
        type: String,
        required: true
    },
    propertyImages: {
        type: [String],
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const ListProperty = mongoose.model("ListProperty", listPropertySchema);
export default ListProperty;


