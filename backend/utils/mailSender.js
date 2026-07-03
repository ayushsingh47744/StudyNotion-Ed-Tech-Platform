const SibApiV3Sdk = require('@getbrevo/brevo');

const mailSender = async (email, title, body) => {
    try {
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        apiInstance.setApiKey(
            SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
            process.env.BREVO_API_KEY
        );

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;
        sendSmtpEmail.sender = {
            name: "StudyNotion",
            email: "ayuuthakur85@gmail.com",
        };
        sendSmtpEmail.to = [{ email: email }];

        const info = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully:", info);
        return info;
    }
    catch (error) {
        console.log("Error sending email:", error.message);
        throw error;
    }
}

module.exports = mailSender;