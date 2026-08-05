import { sendEmail } from "./transporter";

export async function sendEmailChangeNotification(
    oldEmail: string,
    newEmail: string
) {
    await sendEmail({
        to: oldEmail,
        subject: "Security Alert: Your email address was changed",
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                <h2>Email Address Changed</h2>

                <p>Hello,</p>

                <p>This is a notification that the email address associated with your account has been successfully changed.</p>

                <p>
                    <strong>Old Email:</strong> ${oldEmail}<br/>
                    <strong>New Email:</strong> ${newEmail}
                </p>

                <p>If you made this change, no further action is required.</p>

                <div style="margin-top:30px;padding:15px;background-color:#fee2e2;border-left:4px solid #ef4444;">
                    <p style="margin:0;color:#991b1b;font-weight:bold;">Didn't make this change?</p>
                    <p style="margin-top:10px;color:#991b1b;">
                        If you did not authorize this change, please secure your account immediately by resetting your password or contacting our support team.
                    </p>
                </div>
            </div>
        `,
    });
}
