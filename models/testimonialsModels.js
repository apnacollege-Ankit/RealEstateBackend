import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required : true
    },
    title: {
        type : String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;