import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import SubscribeModel2 from '../models/subscribeModel2.js';

export const subscribe2 = async (req, res) => {
    const { email } = req.body;

        if (!email || email.trim() === "") {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

    try {
        const newsLetter = await SubscribeModel2.findOne({email});
        if(newsLetter) {
            return res.status(400).json({success: false, message: "Email already subscribe"});
        }

        const newSubscription = new SubscribeModel2({email});
        await newSubscription.save();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port:Number(process.env.SMTP_PORT),
            secure:Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

 const mailOptions = {
    from: `"Nexus Real Estate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Nexus Real Estate – Your Trusted Property Partner",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
            <h2 style="color: #2b6777;">Welcome to Nexus Real Estate!</h2>
            <p>Dear Valued Subscriber,</p>
            <p>Thank you for subscribing to <strong>Nexus Real Estate</strong>.</p>
            <p>Our newsletter keeps you updated on:</p>
            <ul>
                <li>Latest Property Listings & Market Trends</li>
                <li>Investment Opportunities in Residential & Commercial Spaces</li>
                <li>Expert Real Estate Tips for Buyers & Sellers</li>
                <li>Upcoming Real Estate Projects</li>
                <li>Home Loan & Financing Guidance</li>
            </ul>
            <p>We’re committed to helping you find your dream property and make informed real estate decisions.</p>
            <p>If you ever have questions, feel free to reach out to us directly at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
            <br/>
            <p>Warm Regards,<br><strong>Nexus Real Estate Team</strong></p>
            <p style="font-size: 12px; color: #777;">You’re receiving this email because you subscribed on our website. You can unsubscribe anytime.</p>
        </div>
    `
};



        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message:"Subscribed and confirmation email sent"
        });   
    } catch (error) {
        console.error("Subscription error", error);
        res.status(500).json({success: false, message: "failed to subscribe", error});
    }
};