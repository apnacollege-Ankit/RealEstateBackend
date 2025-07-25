import dotenv from 'dotenv';
dotenv.config();

import OurTeam from '../models/ourTeamModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addOurTeam = async (req, res) => {
    try {
        const image = req.file?.path;
        const {name, gender, position, language} = req.body;

        if(!image || !name || !gender || !position || !language){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields',
            });
        }

        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch (error) {
            console.error("Error Uploading image to cloudinary", error);
            return res.status(500).json({
                success: false,
                message: "Error uploading Image to cloudinary",
            });
        }
        const newTeam = new OurTeam({
            image: uploadedImage.secure_url,
            name,
            gender,
            position,
            language,
        });
        const savedTeam = await newTeam.save();
        res.status(201).json({
            success: true,
            message: 'Our Team Added Successfully',
            data: savedTeam,
        });
    } catch (error) {
        console.error("Error Adding our team", error);
        res.status(500).json({
            success: false,
            message: "Error Adding our team",
            error: error.message,
        });
    }
};

export const getOurTeam = async (req, res) => {
    try {
        const Teams = await OurTeam.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: 'Our Team Retrieved Successfully', 
            data: Teams,
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