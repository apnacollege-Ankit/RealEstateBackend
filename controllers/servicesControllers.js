import Service from "../models/servicesModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import dotenv from 'dotenv';
dotenv.config();

export const createService = async (req, res) => {
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

        const newService = new Service({
            name,
            description,
            image: uploadedImage.secure_url,
            logo: uploadedLogo.secure_url,
        });

        const savedService = await newService.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded and service created successfully",
            data: savedService,
        });
    } catch (error) {
        console.error("Error Creating Service", error);
        res.status(500).json({
            success: false,
            message: "Error creating service",
            error: error.message,
        });
    }
};

export const getService = async (req, res) => {
    try {
        const areas = await Service.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Service fetched successfully",
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

export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully",
            data: service,
        });
    } catch (error) {
        console.error("Error fetching service by ID:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching service by ID",
            error: error.message,
        });
    }
};
