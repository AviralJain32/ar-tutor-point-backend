
import sgMail from '@sendgrid/mail';
import fs from "fs"

import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API);


export const sendCopyrightFormEmail = async (req, res) => {
    // Multer will parse the form-data and make the fields and files available
    const { email, authorName, manuscriptTitle,journalEmail } = req.body; // Access form fields
    const pdfFile = req.file; // Access uploaded file (single file)

    console.log("Form Data:");
    console.log("Email:", email);
    console.log("Author Name:", authorName);
    console.log("Manuscript Title:", manuscriptTitle);

    console.log("Uploaded File Info:", pdfFile);

    if (!pdfFile) {
        return res.status(400).json({ message: "No PDF file uploaded!" });
    }

    // Read the file and convert to base64 (to send via email)
    const fileContent = fs.readFileSync(pdfFile.path).toString('base64');

    const msg = {
        to: [email, `${journalEmail}`],
        from: "adroidpublications@gmail.com", // Replace with your SendGrid verified sender email
        subject: `Signed Journal Publishing Agreement for "${manuscriptTitle}"`,
        text: `Dear ${authorName},
        
        We are pleased to inform you that the signed Journal Publishing Agreement for your manuscript titled "${manuscriptTitle}" has been attached. Please review the agreement and keep a copy for your records.
    
    If you have any questions or require further assistance, feel free to reach out.
    
    Best regards,
    Adroid Publications Team`,
        attachments: [
            {
                content: fileContent,
                filename: pdfFile.originalname,
                type: 'application/pdf',
                disposition: 'attachment'
            }
        ]
    };
    

    try {
        await sgMail.send(msg);
        // Delete file from server after sending
        fs.unlinkSync(pdfFile.path);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        fs.unlinkSync(pdfFile.path);
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Error sending email', error });
    }
};
