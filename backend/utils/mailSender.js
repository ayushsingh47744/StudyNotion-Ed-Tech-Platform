const nodemailer = require("nodemailer");
const dns = require("dns");

// Force IPv4 DNS resolution to avoid ENETUNREACH errors on Render
dns.setDefaultResultOrder('ipv4first');

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion - by Palak',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Email sent successfully:", info.messageId);
        return info;
    }
    catch (error) {
        console.log("Error sending email:", error.message);
        throw error;
    }
}

module.exports = mailSender;