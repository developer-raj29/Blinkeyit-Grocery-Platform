const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Dear <strong>${name}</strong>,</p>

      <p>Thank you for registering on <strong>Binkeyit</strong>! We're excited to have you on board.</p>

      <p>Please click the button below to verify your email address:</p>

      <a 
        href="${url}" 
        style="
          display: inline-block;
          padding: 12px 24px;
          background-color: orange;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 10px;"
      >
        Verify Email
      </a>

      <p>If you didn’t sign up for Binkeyit, you can safely ignore this email.</p>

      <p>Cheers,<br/>The Binkeyit Team</p>
    </div>
  `;
};

module.exports = verifyEmailTemplate;
