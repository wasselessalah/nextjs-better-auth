import { sendEmail } from "./transporter";

export async function sendChangeEmailOtp(newEmail: string, otp: string) {
    await sendEmail({
        to: newEmail,
        subject: "Confirm your new email address",
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
                <h2>Email Change Request</h2>

                <p>We received a request to change the email address on your account.</p>

                <p>Your confirmation code is:</p>

                <h1
                    style="
                        letter-spacing:5px;
                        color:#2563eb;
                        font-size:2.5rem;
                        margin:24px 0;
                    "
                >
                    ${otp}
                </h1>

                <p>This code expires in 10 minutes.</p>

                <p>If you did not request this change, you can safely ignore this email — your current email address will remain unchanged.</p>
            </div>
        `,
    });
}
