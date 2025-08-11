import dotenv from 'dotenv';
dotenv.config();

import ListProperty from '../models/listPropertyModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createListProperty = async (req, res) => {
    try {
        const { propertyType, askingPrice, address, city, state, zipCode, bedrooms, bathrooms, squareFootage, propertyDescription, fullName, emailAddress, phoneNumber } = req.body;

        if (!propertyType || !askingPrice || !address || !city || !state || !zipCode || bedrooms === undefined ||
            bathrooms === undefined ||
            squareFootage === undefined || !propertyDescription || !fullName || !emailAddress || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image file is required",
            });
        }

        const imageUrls = [];
        for (const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(file.path);
            if (uploadedImage && uploadedImage.secure_url) {
                imageUrls.push(uploadedImage.secure_url);
            }
        }

        const newListProperty = new ListProperty({
            propertyImages: imageUrls,
            propertyType,
            askingPrice,
            address,
            city,
            state,
            zipCode,
            bedrooms,
            bathrooms,
            squareFootage,
            propertyDescription,
            fullName,
            emailAddress,
            phoneNumber,
        });
        const savedListProperty = await newListProperty.save();

        res.status(201).json({
            success: true,
            message: "New List Property Created Successfully",
            data: savedListProperty
        });
    } catch (error) {
        console.error("Error Creating Property", error);
        res.status(500).json({
            success: false,
            message: "Server error while creating list property",
            error: error.message,
        });
    }
};

export const getListProperty = async (req, res) => {
    try {
        const properties = await ListProperty.find().sort({ createdAt: -1 }); // Newest first

        res.status(200).json({
            success: true,
            message: "Fetched all listed properties",
            data: properties,
        });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching listed properties",
            error: error.message,
        });
    }
};
