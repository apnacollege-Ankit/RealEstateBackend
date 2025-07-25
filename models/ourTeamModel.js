import mongoose from "mongoose";

const ourTeamSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true
    }
});

const OurTeam = mongoose.model("OurTeam", ourTeamSchema);
export default OurTeam;