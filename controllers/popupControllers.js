import dotenv from 'dotenv';
dotenv.config();
import popupModel from '../models/popupModel.js';

export const createPopup = async (req, res) => {
    try {
        const { name, email, phoneNumber, lookingFor, budget} = req.body;
        if(!name || !email || !phoneNumber || !lookingFor || !budget) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const popup = new popupModel({
            name,
            email,
            phoneNumber,
            lookingFor,
            budget
        });
        const savedpopup = await popup.save();

        res.status(201).json({
            success: true,
            message: "PopupForm created successfully",
            data: savedpopup,
        });
    }   catch (error) {
        console.error("Error Creating Popupform", error);
        res.status(500).json({
            success: false,
            message: "Error creating Popupform",
            error: error.message,
        });
    }
};

export const getPopup = async (req, res) => {
    try {
        const popup = await popupModel.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Popup retrieved successfully",
            data: popup,
        })
    }  catch (error) {
        console.error("Error getting Popup Form", error);
        res.status(500).json({
            success: false,
            message: "Error fetching experts",
            error: error.message
        });
    }
};