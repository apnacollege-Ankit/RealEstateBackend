import mongoose from "mongoose";

const ExpertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    language: {
        type: [String],
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
    position: {
        type: String,
        required: true
    }
});

const Expert = mongoose.model("Expert", ExpertSchema);
export default Expert;