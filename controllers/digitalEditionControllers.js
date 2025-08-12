import dotenv from 'dotenv';
dotenv.config();
import DigitalModel from '../models/digitalEditionModel.js';

export const createDigital = async (req, res) => {
    try {
        const { name, email, phoneNumber} = req.body;
        if(!name || !email || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const Digital = new DigitalModel({
            name,
            email,
            phoneNumber
        });
        const savedDigital = await Digital.save();

        res.status(201).json({
            success: true,
            message: "Digital Edition created successfully",
            data: savedDigital,
        });
    }   catch (error) {
        console.error("Error Creating ", error);
        res.status(500).json({
            success: false,
            message: "Error creating Digital Edition",
            error: error.message,
        });
    }
};

export const getDigital = async (req, res) => {
    try {
        const digital = await DigitalModel.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Digital Edition retrieved successfully",
            data: digital,
        })
    }  catch (error) {
        console.error("Error getting Digital Edition", error);
        res.status(500).json({
            success: false,
            message: "Error fetching experts",
            error: error.message
        });
    }
};