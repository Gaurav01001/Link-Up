const nodemailer = require("nodemailer");

const sendResetEmail = async (email, resetUrl) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("Gmail SMTP credentials (EMAIL_USER/EMAIL_PASS) are not set in .env.");
    console.log(`[FALLBACK] Password reset link for ${email}: ${resetUrl}`);
    return;
  }

  // Create transporter for Gmail App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"Side Quest" <${user}>`,
    to: email,
    subject: "Reset Your Password - Side Quest",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #E8E6E1; border-radius: 16px; background-color: #FAFAF8; color: #1A1916;">
        <h2 style="color: #FF6B47; text-align: center; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h2>
        <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.6;">We received a request to reset the password for your Side Quest account. Click the button below to choose a new password. This link will expire in 60 minutes.</p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="${resetUrl}" style="background-color: #FF6B47; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(255, 107, 71, 0.25);">Reset Password</a>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #6B6860;">If the button above does not work, copy and paste this link into your web browser:</p>
        <p style="word-break: break-all; font-size: 14px; color: #7B68EE;"><a href="${resetUrl}">${resetUrl}</a></p>
        <p style="font-size: 14px; line-height: 1.6; color: #6B6860; margin-top: 25px;">If you did not request a password reset, please disregard this email. Your password will remain unchanged.</p>
        <hr style="border: none; border-top: 1px solid #E8E6E1; margin: 30px 0;" />
        <p style="font-size: 12px; color: #A09D97; text-align: center;">Side Quest Inc. &bull; Social Activity Platform</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`[SMTP] Reset email successfully sent to ${email}`);
};

module.exports = { sendResetEmail };
