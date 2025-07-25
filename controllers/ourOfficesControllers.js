import dotenv from 'dotenv';
dotenv.config();

import OurOffice from '../models/ourOfficesModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createOurOffice = async (req, res) =>{
    try {
        const {address, latitude, longitude, phoneNumber} = req.body;

        if(!address || !latitude || !longitude || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Please Fill all Fields',
            });
        }

        if(!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image',
            });
        }

        const imageUrls = [];
        for(const file of req.files) {
            const uploadedImage = await uploadOnCloudinary(file.path);
            if(uploadedImage && uploadedImage.secure_url) {
                imageUrls.push(uploadedImage.secure_url);
            }
        }

        const newOffice = new OurOffice({
            images: imageUrls,
            address,
            latitude,
            longitude,
            phoneNumber
        });
        const savedOffice = await newOffice.save();

        res.status(201).json({
            success: true,
            message: 'Our Office Created Successfully',
            data: savedOffice,
        });
    } catch (error) {
        console.error("Error creating our office", error);
        res.status(500).json({
            success: false,
            message: 'Failed to create our office',
            error: error.message
        })
    }
};

export const getOurOffice = async (req, res) => {
    try {
        const ourOffice = await OurOffice.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Our office data fetched Successfully",
            data: ourOffice,
        });
    } catch (error) {
        console.error("Error Fetching our office data", error);
        res.status(500).json({
            success: false,
            message: 'failed to fetch our office data',
            error: error.message
        });
    }
};