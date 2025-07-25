import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import Subscribe from '../models/subscribeModel.js';

export const subscribe = async (req, res) => {
    const {name, email} = req.body;

    if(!email || !name) {
        return res.status(400).json({
            success: false,
            message: "name & Email is required"
        });
    }
    try {
        const subscribed = await Subscribe.findOne({email});
        if(subscribed) {
            return res.status(400).json({success: false, message: "Email already Subscribe"});
        }
        const newSubscription = new Subscribe({name, email});
        await newSubscription.save();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
    from: `"DevNexus Real Estate Partner" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Subscribing to Our Real Estate Newsletter!",
    html: `
        <h2>Welcome to Our Real Estate Community, ${name}!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>Stay tuned for the latest updates on:</p>
        <ul>
            <li>New Property Listings</li>
            <li>Real Estate Market Insights</li>
            <li>Exclusive Investment Opportunities</li>
            <li>Property Buying & Selling Tips</li>
        </ul>
        <p>We're excited to help you find your perfect home or investment property!</p>
        <p>Regards,<br>DevNexus Real Estate Team</p>
    `
};


        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: "Subscribed and confirmation email sent"
        });

    } catch (error) {
        console.error("Subscription error", error);
        res.status(500).json({ success: false, message: "Failed to subscribe", error });
    }
};

