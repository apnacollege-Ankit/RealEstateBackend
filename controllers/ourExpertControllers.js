import dotenv from 'dotenv';
dotenv.config();

import Expert from '../models/ourExpertModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addOurExpert = async (req, res) => {
    try {
        const image = req.file?.path;
        const {name, language, email, phoneNumber, position} = req.body;

        if(!image || !name, !language || !email || !phoneNumber || !position) {
            return res.status(400).json({
                success: false,
                message: 'Image, name, language, email, phone number and position are required',
            });
        }

        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch (error) {
            console.error("Error uploading image to cloudinary", error);
            return res.status(500).json({
                success: false,
                message: "Error uploading Image to cloudinary", 
            });
        }

        const newExpert = new Expert({
            image: uploadedImage.secure_url,
            name,
            language,
            email,
            phoneNumber,
            position,
        });
        const savedExpert = await newExpert.save();

        res.status(201).json({
            success: true,
            message: 'Our Expert Added Successfully',
            data: savedExpert,
        });
    } catch (error) {
        console.error('Error adding our expert', error);
        res.status(500).json({
            success: false,
            message: 'Error adding our expert',
            error: error.message,
        })
    }
};

export const getOurExpert = async (req, res) => {
    try {
        const experts = await Expert.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            message: 'Expert fetched Successfully',
            data: experts,
        })
    } catch (error) {
        console.error("Error fetching experts", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching experts',
            error: error.message,
        });
    }
};