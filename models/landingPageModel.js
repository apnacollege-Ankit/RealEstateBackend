import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["ongoing", "upcoming", "ready"],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bathroom: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        enum: ["Rent", "Buy", "OffPlan"],
        required: true
    }
});

const PropertyModel = mongoose.model("PropertyModel", propertySchema);
export default PropertyModel;


