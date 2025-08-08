import dotenv from 'dotenv';
dotenv.config();

import ListProperty from '../models/listPropertyModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createListProperty = async (req, res) => {
    try {
        const { PropertyType, AskingPrice, Address, City, State, ZipCode, Bedrooms, Bathrooms, SquareFootage, PropertyDescription, FullName, EmailAddress, PhoneNumber } = req.body;

        if (!PropertyType || !AskingPrice || !Address || !City || !State || !ZipCode || Bedrooms === undefined ||
            Bathrooms === undefined ||
            SquareFootage === undefined || !PropertyDescription || !FullName || !EmailAddress || !PhoneNumber) {
            return res.Status(400).json({
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
            PropertyImages: imageUrls,
            PropertyType,
            AskingPrice,
            Address,
            City,
            State,
            ZipCode,
            Bedrooms,
            Bathrooms,
            SquareFootage,
            PropertyDescription,
            FullName,
            EmailAddress,
            PhoneNumber,
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
