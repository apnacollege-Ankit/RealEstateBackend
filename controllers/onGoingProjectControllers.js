import dotenv from 'dotenv';
dotenv.config();

import OnGoing from '../models/onGoingProjectModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';

export const addOnGoingProject = async (req, res) => {
    try {
        const {tags, year, title, owner, price, location, beds, email, phoneNumber, description} = req.body;

        if(!tags || !year || !title || !owner || !price || !location || !beds || !email || !phoneNumber || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields',
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

        const tagsArray = Array.isArray(tags) ? tags : tags.split(',');

        const newOnGoingProject = new OnGoing({
            images: imageUrls,
            tags: tagsArray,
            year,
            title,
            owner,
            price,
            location,
            beds,
            email,
            phoneNumber,
            description
        });
        const savedOnGoingProject = await newOnGoingProject.save();

        res.status(201).json({
            success: true,
            message: "OnGoing Project Added Successfully",
            data: savedOnGoingProject,
        });
    } catch (error) {
        console.error("Error Adding OnGoing Project", error);
        res.status(500).json({
            success: false,
            message: 'Server Error during upload', 
            error: error.message
        })
    }
};

export const getOnGoingProject = async (req, res) => {
    try {
        const onGoingProject = await OnGoing.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            data: onGoingProject,
        });
    } catch (error) {
        console.error("Error fetching OnGoingProject", error);
        res.status(500).json({
            success: false,
            message: 'Server Error during Fetch',
            error: error.message
        });
    }
};

export const getOnGoingProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid project ID",
            });
        }

        const project = await OnGoing.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            data: project,
        });
    } catch (error) {
        console.error("Error fetching OnGoingProject by ID", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching project",
            error: error.message,
        });
    }
};