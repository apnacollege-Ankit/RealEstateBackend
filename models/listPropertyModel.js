import mongoose from "mongoose";

const listPropertySchema = new mongoose.Schema({
    PropertyType: {
        type: String,
        required: true
    },
    AskingPrice: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    ZipCode: {
        type: String,
        required: true
    },
    Bedrooms: {
        type: String,
        required: true
    },
    Bathrooms: {
        type: String,
        required: true
    },
    SquareFootage: {
        type: String,
        required: true
    },
    PropertyDescription: {
        type: String,
        required: true
    },
    PropertyImages: {
        type: [String],
        required: true
    },
    FullName: {
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    }
});

const ListProperty = mongoose.model("ListProperty", listPropertySchema);
export default ListProperty;