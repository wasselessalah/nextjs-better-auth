import { sendEmail } from "./transporter";

export async function sendResetPasswordEmail(
  email: string,
  resetUrl: string
) {
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Password Reset</h2>

        <p>We received a request to reset your password.</p>

        <p>
          Click the button below to create a new password:
        </p>

        <p style="margin: 30px 0;">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background: #2563eb;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>
        </p>

        <p>
          Or copy and paste this link into your browser:
        </p>

        <p>
          <a href="${resetUrl}">
            ${resetUrl}
          </a>
        </p>

        <p>This reset link expires in 10 minutes.</p>

        <p>If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  });
}