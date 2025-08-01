import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import PropertyModel from '../models/landingPageModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createProperty = async (req, res) => {
    try {
        const {
            title,
            owner,
            price,
            location,
            beds,
            phoneNumber,
            description,
            area,
            bathroom,
            status,
            type,
            category
        } = req.body;

        // Validate all required fields
        if (!title || !owner || !price || !location || !beds || !phoneNumber || !description || !area || !bathroom ||!status || !type || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image file is required.",
            });
        }

        // Upload multiple images to Cloudinary
        const imageUrls = [];
        for (const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(file.path);
            if (uploadedImage && uploadedImage.secure_url) {
                imageUrls.push(uploadedImage.secure_url);
            }
        }

        const property = new PropertyModel({
            images: imageUrls,
            title,
            owner,
            price,
            location,
            beds,
            phoneNumber,
            description,
            area,
            bathroom,
            status,
            type,
            category
        });

        const savedProperty = await property.save();

        res.status(201).json({
            success: true,
            message: "Property created successfully.",
            data: savedProperty,
        });

    } catch (error) {
        console.error("Error creating property", error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating property.',
            error: error.message,
        });
    }
};


export const getProperty = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const properties = await PropertyModel.find(filter).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            message: "Properties fetched successfully.",
            data: properties,
        });
    } catch (error) {
        console.error("Error fetching properties", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching properties.",
            error: error.message
        });
    }
};

export const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid property ID.",
            });
        }

        const property = await PropertyModel.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Property fetched successfully.",
            data: property,
        });

    } catch (error) {
        console.error("Error fetching property by ID", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching property.",
            error: error.message,
        });
    }
};


