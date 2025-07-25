import dotenv from 'dotenv';
dotenv.config();

import Testimonial from "../models/testimonialsModels.js";

export const addTestimonials = async (req, res) => {
    try {
        const { name, gender, year, title, description } = req.body || {};

        const testiMonials = await Testimonial.create({
            name,
            gender,
            year,
            title,
            description
        });
        res.status(201).json({ success: true, data: testiMonials });
    } catch (error) {
        console.error("Error in addTestimonials", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error while adding",
            error: error.message,
        });
    }
};

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: "Testimonials fetched successfully",
            data: testimonials,
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching testimonials",
            error: error.message,
        });
    }
};