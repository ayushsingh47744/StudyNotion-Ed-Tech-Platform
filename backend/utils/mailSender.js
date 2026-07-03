const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
    try {
        const info = await resend.emails.send({
            from: "StudyNotion <onboarding@resend.dev>", // testing ke liye ye default domain use hota hai
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info);
        return info;
    }
    catch (error) {
        console.log("Error sending email:", error.message);
        throw error;
    }
}

module.exports = mailSender;