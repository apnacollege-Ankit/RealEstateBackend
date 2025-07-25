import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Developer = mongoose.model("Developer", developerSchema);
export default Developer;