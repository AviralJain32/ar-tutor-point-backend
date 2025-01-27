import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API);

export const sendMail = async (req, res) => {
    const { Class, email, message, name, phone } = req.body;

    // Validate the input data
    if (!name || !email || !message || !Class) {
        return res.status(400).json({ error: "Please provide name, email, and message" });
    }

    // Construct the email message
    const msg = {
        to: 'adroidjournal@gmail.com', // Change to your recipient
        from: {
            name: `${name}`,
            email: `adroidjournal@gmail.com`,
        }, // Change to your verified sender
        subject: 'New User Query - Action Required',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2e6ccf;">New Query Submission</h2>
                <p>Hello Adroid Publishing Team,</p>
                <p>You have received a new query from a user. Below are the details:</p>

                <div style="border-top: 2px solid #2e6ccf; padding-top: 10px;">
                    <h3 style="color: #2e6ccf;">User Details</h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li><strong style="color: #333;">Name:</strong> ${name}</li>
                        <li><strong style="color: #333;">Email:</strong> ${email}</li>
                        <li><strong style="color: #333;">Phone:</strong> ${phone}</li>
                        <li><strong style="color: #333;">Class:</strong> ${Class}</li>
                    </ul>
                </div>

                <div style="border-top: 2px solid #2e6ccf; padding-top: 10px;">
                    <h3 style="color: #2e6ccf;">Message</h3>
                    <p style="font-size: 16px; color: #555;">${message}</p>
                </div>

                <p style="padding-top: 10px;">Please respond to this inquiry as soon as possible. We appreciate your prompt attention to this matter.</p>

                <p style="font-size: 14px; color: #888;">Thank you for your time and support.</p>

                <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
                    <p style="font-size: 12px; color: #888;">This email was generated automatically, please do not reply to this message directly.</p>
                </div>
            </div>
        `,
    };

    try {
        // Send the email
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
};
