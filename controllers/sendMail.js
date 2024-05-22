

// import nodemailer from "nodemailer";

// export const sendMail = async (req, res) => {
//     const { name, email, message } = req.body;

//     // Validate the input data
//     if (!name || !email || !message) {
//         return res.status(400).json({ error: "Please provide name, email, and message" });
//     }

//     try {
//         // var transport = nodemailer.createTransport({
//         //     host: "sandbox.smtp.mailtrap.io",
//         //     port: 2525,
//         //     auth: {
//         //       user: "5b7c8b884f27fb",
//         //       pass: "ca4cf2fe7e73b9"
//         //     }
//         //   });

//           var transport = nodemailer.createTransport({
//             host: "live.smtp.mailtrap.io",
//             port: 587,
//             auth: {
//               user: "api",
//               pass: "79e065d08595a48c188e603751e5bd53"
//             }
//           });

//         const mailOptions = {
//             from: `${name} <${email}>`,
//             to: "aviral2853@gmail.com",
//             subject: `Query From AP user: ${name}`,
//             html: `
//                 <p>Hello Adroid Publications Team,</p>
//                 <p>You have received a new query from a user:</p>
//                 <ul>
//                     <li><strong>Name:</strong> ${name}</li>
//                     <li><strong>Email:</strong> ${email}</li>
//                     <li><strong>Message:</strong></li>
//                     <p>${message}</p>
//                 </ul>
//                 <p>Please respond to this inquiry as soon as possible.</p>
//                 <p>Thank you.</p>
//             `
//         };

//         const mailresponse = await transport.sendMail(mailOptions);
//         console.log(mailresponse);
//         return res.status(200).json({ success: "Email sent successfully" });
//     } catch (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ error: "Failed to send email" });
//     }
// };



// import { Resend } from "resend";
// import Dotenv from 'dotenv';

// Dotenv.config()

// export const sendMail = async (req, res) => {
//     const { name, email, message } = req.body;

//     // Validate the input data
//     if (!name || !email || !message) {
//         return res.status(400).json({ error: "Please provide name, email, and message" });
//     }
//     const resend = new Resend(process.env.RESEND_API);


//     try {
//         const { data, error } = await resend.emails.send({
//             from: "Adroid Publications <onboarding@resend.dev>",
//             to: ["adroidpublications@gmail.com"],
//             subject: "hello world",
//             html: `
//             <p>Hello Adroid Publications Team,</p>
//             <p>You have received a new query from a user:</p>
//             <ul>
//                 <li><strong>Name:</strong> ${name}</li>
//                 <li><strong>Email:</strong> ${email}</li>
//                 <li><strong>Message:</strong></li>
//                 <p>${message}</p>
//             </ul>
//             <p>Please respond to this inquiry as soon as possible.</p>
//             <p>Thank you.</p>
//         `,
//         });


//         if (error) {
//             return res.status(400).json({ error });
//           }
        
//           res.status(200).json({ data });
//     } 
//     catch (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ error: "Failed to send email" });
//     }
// };


// <p>Thank you for your submission for consideration in the journal by Adroid Publishing.</p>
{/* <p>Your submission details as follows:</p>
<p><strong>Paper ID:</strong></p>
<p><strong>Paper Title:</strong></p>
<p>Please use Paper ID regarding any further communication with us.</p>
<p>Email ID.</p> */}


import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API);

export const sendMail = async (req, res) => {
    const { name, email, message } = req.body;

    // Validate the input data
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please provide name, email, and message" });
    }

    // Construct the email message
    const msg = {
        to: 'adroidpublications@gmail.com', // Change to your recipient
        from: {
            name:`${name}`,
            email:`adroidjournals@gmail.com`
        }, // Change to your verified sender
        subject: 'New Query',
        html: `
            <p>Hello Adroid Publications Team,</p>
            <p>You have received a new query from a user:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Please respond to this inquiry as soon as possible.</p>
            <p>Thank you.</p>
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
