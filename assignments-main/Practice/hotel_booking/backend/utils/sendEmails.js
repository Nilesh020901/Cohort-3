const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // e.g. your@gmail.com
        pass: process.env.EMAIL_PASS   // app password or actual password
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        await transport.sendMail(mailOptions);
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

module.exports = sendEmail;