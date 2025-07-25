import mongoose from "mongoose";

const onGoingSchema = new mongoose.Schema({
    images: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
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
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const OnGoing = mongoose.model("OnGoing", onGoingSchema);
export default OnGoing;