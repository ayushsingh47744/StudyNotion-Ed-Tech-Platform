const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,  // true for port 465
    family: 4,
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