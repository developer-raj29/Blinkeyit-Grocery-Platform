const { Resend } = require("resend");
require("dotenv").config();

if (!process.env.RESEND_API) {
  console.error("❌ RESEND_API is missing in your .env file");
  process.exit(1); // Prevent app from running if key is missing
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Binkeyit <noreply@developer_raj.co.in>",
      to: Array.isArray(sendTo) ? sendTo : [sendTo], // Makes sure sendTo is an array
      subject,
      html,
    });

    if (error) {
      console.error("❌ Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("❌ Unexpected error while sending email:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
};

module.exports = sendEmail;
