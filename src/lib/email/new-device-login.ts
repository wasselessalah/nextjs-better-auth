import { sendEmail } from "./transporter";

interface NewDeviceLoginEmailParams {
  email: string;
  browser: string;
  os: string;
  ipAddress: string;
  loginAt: Date;
}

export async function sendNewDeviceLoginEmail({
  email,
  browser,
  os,
  ipAddress,
  loginAt,
}: NewDeviceLoginEmailParams) {
  const formattedDate = loginAt.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  await sendEmail({
    to: email,
    subject: "⚠️ New device sign-in detected",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #1f2937;">

        <div style="background: #1e40af; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Sign-In Detected</h1>
        </div>

        <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">

          <p style="margin-top: 0;">Hello,</p>

          <p>
            We detected a sign-in to your account from a device we haven't seen before.
          </p>

          <div style="background: #f3f4f6; border-left: 4px solid #2563eb; padding: 16px 20px; border-radius: 4px; margin: 24px 0;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #111827;">Sign-In Details</p>
            <table style="border-collapse: collapse; width: 100%; font-size: 14px; color: #374151;">
              <tr>
                <td style="padding: 4px 0; width: 110px; font-weight: 600;">Date &amp; Time:</td>
                <td style="padding: 4px 0;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Browser:</td>
                <td style="padding: 4px 0;">${browser}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Operating System:</td>
                <td style="padding: 4px 0;">${os}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">IP Address:</td>
                <td style="padding: 4px 0;">${ipAddress || "Unknown"}</td>
              </tr>
            </table>
          </div>

          <p>If this was you, no action is required.</p>

          <div style="margin-top: 24px; padding: 16px 20px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
            <p style="margin: 0 0 8px; color: #991b1b; font-weight: bold;">Wasn't you?</p>
            <p style="margin: 0; color: #b91c1c; font-size: 14px;">
              If you did not sign in, your account may be compromised. Please reset your password immediately and review your account activity.
            </p>
          </div>

          <p style="margin-top: 24px; font-size: 13px; color: #6b7280;">
            This is an automated security alert. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
  });
}
