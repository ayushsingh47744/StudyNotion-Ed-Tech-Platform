const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification - StudyNotion</title>
  </head>

  <body style="
    margin:0;
    padding:20px;
    background-color:#0F1117;
    font-family:Arial, Helvetica, sans-serif;
  ">

    <div style="
      max-width:500px;
      margin:0 auto;
      background-color:#111827;
      border:1px solid #1F2937;
      border-radius:12px;
      overflow:hidden;
    ">

      <!-- Header -->
      <div style="
        background-color:#161D29;
        padding:24px;
        text-align:center;
      ">
        <h1 style="
          margin:0;
          color:#FFFFFF;
          font-size:28px;
          font-weight:700;
          letter-spacing:0.5px;
        ">
          StudyNotion
        </h1>

        <p style="
          margin:8px 0 0;
          color:#D1D5DB;
          font-size:15px;
        ">
          Learn. Build. Grow.
        </p>
      </div>

      <!-- Content -->
      <div style="padding:24px;">

        <h2 style="
          margin:0 0 20px;
          color:#FFFFFF;
          font-size:22px;
          text-align:center;
        ">
          OTP Verification Email
        </h2>

        <p style="
          margin:0 0 16px;
          color:#E5E7EB;
          font-size:16px;
        ">
          Dear User,
        </p>

        <p style="
          margin:0 0 20px;
          color:#D1D5DB;
          font-size:15px;
          line-height:1.7;
        ">
          Thank you for registering with
          <strong style="color:#FFFFFF;">StudyNotion</strong>.
          To complete your registration, please use the OTP below
          to verify your account:
        </p>

        <!-- OTP Box -->
        <div style="
          text-align:center;
          margin:30px 0;
        ">
          <div style="
            display:inline-block;
            background-color:#FFFFFF;
            color:#161D29;
            font-size:32px;
            font-weight:900;
            letter-spacing:6px;
            padding:16px 32px;
            border-radius:8px;
            border:3px solid #FFD60A;
          ">
            ${otp}
          </div>
        </div>

        <p style="
          margin:0 0 16px;
          color:#D1D5DB;
          font-size:15px;
          line-height:1.7;
        ">
          This OTP is valid for
          <strong style="color:#FFFFFF;">5 minutes</strong>.
          If you did not request this verification,
          please ignore this email.
        </p>

        <p style="
          margin:0 0 24px;
          color:#D1D5DB;
          font-size:15px;
          line-height:1.7;
        ">
          Once your account is verified, you will have access
          to all StudyNotion features.
        </p>

        <hr style="
          border:none;
          border-top:1px solid #1F2937;
          margin:24px 0;
        ">

        <!-- Footer -->
        <p style="
          margin:0;
          color:#D1D5DB;
          font-size:14px;
          line-height:1.6;
        ">
          Need help? Contact us at
          <a
            href="mailto:info@studynotion.com"
            style="
              color:#FFD60A;
              text-decoration:none;
            "
          >
            info@studynotion.com
          </a>
        </p>

        <p style="
          margin:20px 0 0;
          color:#9CA3AF;
          font-size:12px;
          text-align:center;
        ">
          © ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </p>

      </div>

    </div>

  </body>
  </html>
  `;
};

module.exports = otpTemplate;