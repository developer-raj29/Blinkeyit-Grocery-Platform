const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (sendTo, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Blinkit Grocery App" <${process.env.MAIL_USER}>`,
      to: sendTo,
      subject: subject,
      html: html,
    });

    console.log("Email sent:", info);
    return info;
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

module.exports = mailSender;

// const { Resend } = require("resend");
// require("dotenv").config();

// if (!process.env.RESEND_API) {
//   console.error("❌ RESEND_API is missing in your .env file");
//   process.exit(1); // Prevent app from running if key is missing
// }

// const resend = new Resend(process.env.RESEND_API);
// // resend.domains.create({ name: "rajyadav7047@gmail.com" });

// const sendEmail = async ({ sendTo, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: Array.isArray(sendTo) ? sendTo : [sendTo], // Makes sure sendTo is an array
//       subject,
//       html,
//     });

//     if (error) {
//       console.error("❌ Email send error:", error);
//       return { success: false, error };
//     }

//     return { success: true, data };
//   } catch (err) {
//     console.error("❌ Unexpected error while sending email:", err);
//     return { success: false, error: err.message || "Unknown error" };
//   }
// };

// module.exports = sendEmail;
