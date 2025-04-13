const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Dear <strong>${name}</strong>,</p>

      <p>You recently requested to reset your password for your Binkeyit account. Use the OTP code below to reset it:</p>

      <div style="
        background-color: #ffeb3b;
        font-size: 24px;
        padding: 16px;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
        border-radius: 8px;
        width: fit-content;
        margin: 20px auto;
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <strong>1 hour</strong>. Please do not share this code with anyone.</p>

      <p>If you did not request a password reset, please ignore this email or contact support if you’re concerned.</p>

      <p>Thanks,<br/>The Binkeyit Team</p>
    </div>
  `;
};

module.exports = forgotPasswordTemplate;
