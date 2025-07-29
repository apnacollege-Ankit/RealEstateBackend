import Developer from '../models/developerModel.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();

export const createDeveloper = async (req, res) => {
    try {
    const {name, description} = req.body;
    const image = req.files?.image?.[0]?.path;
    const logo = req.files?.logo?.[0]?.path;

    if(!image || !logo === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both image and logo',
        });
    }

    if(!name || !description) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both name and description',
        });
    }

    let uploadedImage, uploadedLogo;
    try {
        uploadedImage = await uploadOnCloudinary(image);
        uploadedLogo = await uploadOnCloudinary(logo);
        console.log("uploadedImage", uploadedImage);
        console.log("uploadedlogo", uploadedLogo);
    } catch (error) {
        console.error("Error Uploading image to Cloudinary", error);
        return res.status(500).json({
            success: false,
            message: 'Error uploading image to Cloudinary:'
        });
    }

    const newDeveloper = await Developer({
        name,
        description,
        image: uploadedImage.secure_url || "",
        logo: uploadedLogo.secure_url || ""
    });

    const savedDeveloper = await newDeveloper.save();

    res.status(201).json({
        success: true,
        message: "Image uploaded and product saved successfully",
        data: savedDeveloper
    });
} catch (error) {
    console.error("Error creating developer", error);
    res.status(500).json({
        success: false,
        message: 'Error creating developer',
        error: error.message,
    });
}
};

export const getDeveloper = async (req, res) => {
    try {
        const developer = await Developer.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            message: "Developer retrieved successfully",
            data: developer,
        });
    } catch (error) {
        console.error("Error getting developer", error);
        res.status(500).json({
            success: false,
            message: "Error getting developer",
            error: error.message,
        });
    }
};