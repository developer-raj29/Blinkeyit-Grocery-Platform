const verifyEmailTemplate = ({ name, url }) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 40px; text-align: center; color: #333;">
    <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <img 
        src="https://res.cloudinary.com/dzlccxjlh/image/upload/v1756059800/binkeyit/logo_fvgeyg.png" 
        alt="Binkeyit Logo" 
        width="180" 
        style="margin-bottom: 10px;" 
      />
  
      <!-- Body -->
      <p style="font-size: 16px; text-align: left;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size: 15px; text-align: left;">
        Thank you for registering with <strong>Binkeyit</strong>!  
        Please verify your email address to activate your account.
      </p>

      <!-- Verify Button -->
      <a 
        href="${url}" 
        style="
          display: inline-block;
          padding: 12px 24px;
          background-color: #ff6600;
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: bold;
          margin: 20px 0;
        "
      >
        ✅ Verify Email
      </a>

      <!-- Fallback Link -->
      <p style="font-size: 13px; color: #666; margin-top: 20px;">
        Or copy and paste this link into your browser:
      </p>
      <p style="font-size: 13px; word-break: break-all; color: #1a73e8;">
        <a href="${url}" style="color: #1a73e8;">${url}</a>
      </p>

      <!-- Footer -->
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        If you didn’t create an account, you can safely ignore this email.
      </p>
      <p style="font-size: 12px; color: #999;">
        Cheers, <br/> ❤️ Raj.Dev – The Binkeyit Team
      </p>
    </div>
  </div>
  `;
};

module.exports = verifyEmailTemplate;
