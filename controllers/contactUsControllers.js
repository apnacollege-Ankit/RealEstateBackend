import nodemailer from 'nodemailer';


export const contactus= async (req, res) => {
    try {
        const { name, email, phoneNumber, language, message } = req.body || {};

        console.log("Client email:", email);
        console.log("Admin email:", process.env.ADMIN_MAIL);


        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });



        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("SMTP credentials not set.");
            return res.status(500).json({ error: "Server email configuration error." });
        }



        // === Email to Client ===
        const clientHtmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <h2 style="color: #007bff;">Thank you for reaching out to DevNexus RealEstate Solutions</h2>
        <p>Dear <strong>${name}</strong>,</p>

        <p>We appreciate your interest in our real estate services. Below are the details we have received from you:</p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Property Interest:</strong> ${language}</li>
            <li><strong>Your Message:</strong> ${message}</li>
        </ul>

        <p>Our dedicated real estate consultants will carefully review your inquiry and get in touch with you shortly to assist you further, whether you're looking to buy, sell, rent, or invest in property.</p>

        <p>Thank you for choosing <strong>DevNexus RealEstate Solutions</strong> — your trusted partner in real estate.</p>
        <br/>
        <p>Best Regards,<br/><strong>DevNexus RealEstate Solutions Team</strong></p>
    </div>
`;


        const clientMailOptions = {
            from: `"DevNexus Solutions" <${process.env.EMAIL_USER}>`,
            to: email.trim(),  // user email like Gmail
            replyTo: process.env.EMAIL_USER,
            // subject: 'Thank you for contacting DevNexus RealEstate Solutions',
            html: clientHtmlContent
        };


        const adminEmail = process.env.ADMIN_MAIL ? process.env.ADMIN_MAIL.trim() : null;

        if (!adminEmail) {
            console.error("ADMIN_MAIL is missing from environment variables.");
            return res.status(500).json({ error: "Admin email not configured." });
        }


        const ownerMailOptions = {
            from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `New Contact Request - ${language}`,
            text: `New contact form submission:
                    Name: ${name}
                    Email: ${email}
                    Phone: ${phoneNumber}
                    language: ${language}
                    Message: ${message}`
        };


        await transporter.sendMail(ownerMailOptions);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
        await transporter.sendMail(clientMailOptions);

        res.status(200).json({ message: 'Form submitted and emails sent successfully.' });
    } catch (error) {
        console.error('Mail sending error:', error);
        res.status(500).json({ error: error.message || 'Failed to send email.' });
    }
};