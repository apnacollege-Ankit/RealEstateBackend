import dotenv from 'dotenv';
dotenv.config();
import InquiryModel from '../models/inquiryModel.js';

export const createInquiry = async (req, res) => {
    try {
        const { name, email, phoneNumber, message} = req.body;
        if(!name || !email || !phoneNumber || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const Inquiry = new InquiryModel({
            name,
            email,
            phoneNumber,
            message
        });
        const savedInquiry = await Inquiry.save();

        res.status(201).json({
            success: true,
            message: "Inquiry created successfully",
            data: savedInquiry,
        });
    }   catch (error) {
        console.error("Error Creating Inquiry", error);
        res.status(500).json({
            success: false,
            message: "Error creating Inquiry",
            error: error.message,
        });
    }
};

export const getInquiry = async (req, res) => {
    try {
        const downloads = await InquiryModel.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Inquiry retrieved successfully",
            data: downloads,
        })
    }  catch (error) {
        console.error("Error getting Inquiry", error);
        res.status(500).json({
            success: false,
            message: "Error fetching experts",
            error: error.message
        });
    }
};