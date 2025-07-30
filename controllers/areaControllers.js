import Area from "../models/areaModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import dotenv from 'dotenv';
dotenv.config();

export const createArea = async (req, res) => {
    try {
        const { name, description } = req.body;
        const imagePath = req.files?.image?.[0]?.path;
        const logoPath = req.files?.logo?.[0]?.path;

        if (!imagePath || !logoPath) {
            return res.status(400).json({
                success: false,
                message: "Please upload both image and logo",
            });
        }

        let uploadedImage, uploadedLogo;

        try {
            uploadedImage = await uploadOnCloudinary(imagePath);
            uploadedLogo = await uploadOnCloudinary(logoPath);

            if (!uploadedImage?.secure_url || !uploadedLogo?.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Cloudinary upload failed. Check your credentials or file format.",
                });
            }
        } catch (cloudErr) {
            console.error("Cloudinary upload error:", cloudErr);
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload error",
                error: cloudErr.message,
            });
        }

        const newArea = new Area({
            name,
            description,
            image: uploadedImage.secure_url,
            logo: uploadedLogo.secure_url,
        });

        const savedArea = await newArea.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded and area created successfully",
            data: savedArea,
        });
    } catch (error) {
        console.error("Error Creating Area:", error);
        res.status(500).json({
            success: false,
            message: "Error creating area",
            error: error.message,
        });
    }
};

export const getArea = async (req, res) => {
    try {
        const areas = await Area.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Areas fetched successfully",
            data: areas,
        });
    } catch (error) {
        console.error("Error fetching areas:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching areas",
            error: error.message,
        });
    }
};

export const getAreaById = async (req, res) => {
    try {
        const { id } = req.params;
        const area = await Area.findById(id);

        if (!area) {
            return res.status(404).json({
                success: false,
                message: "Area not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Area retrieved successfully",
            data: area,
        });
    } catch (error) {
        console.error("Error fetching area by ID:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching area by ID",
            error: error.message,
        });
    }
};
