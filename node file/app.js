const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle sending emails
app.post('/send', async (req, res) => {
    const { name, email, message, number } = req.body; // Include the number field

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manjeetkatariya2000@gmail.com', // Your email
            pass: 'ubuk luez gqgs fben' // Your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'manjeetkatariya2000@gmail.com',
        subject: `New message from ${name}`,
        text: `Message: ${message}\n\nPhone Number: ${number}` // Include the phone number in the email body
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
