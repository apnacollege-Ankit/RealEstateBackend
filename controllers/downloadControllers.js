import dotenv from 'dotenv';
dotenv.config();
import Download from '../models/downloadModel.js';

export const createDownload = async (req, res) => {
    try {
        const {name, email, phoneNumber, language} = req.body;
        if(!name || !email || !phoneNumber || !language) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const download = new Download({
            name,
            email,
            phoneNumber,
            language
        });
        const savedDownload = await download.save();

        res.status(201).json({
            success: true,
            message: "Download created successfully",
            data: savedDownload,
        });
    }   catch (error) {
        console.error("Error Creating download", error);
        res.status(500).json({
            success: false,
            message: "Error creating download",
            error: error.message,
        });
    }
};

export const getDownloads = async (req, res) => {
    try {
        const downloads = await Download.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Downloads retrieved successfully",
            data: downloads,
        })
    }  catch (error) {
        console.error("Error getting downloads", error);
        res.status(500).json({
            success: false,
            message: "Error fetching experts",
            error: error.message
        });
    }
};