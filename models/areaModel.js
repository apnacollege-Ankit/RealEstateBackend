import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
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
        required:true
    },
    description:{
        type: String,
        required: true
    }
});

const Area = mongoose.model("Area", areaSchema);
export default Area;