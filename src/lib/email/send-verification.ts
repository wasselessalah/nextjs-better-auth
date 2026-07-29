import { sendEmail } from "./transporter";

export async function sendVerificationEmail(
    email: string,
    otp: string
) {
    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `
            <div style="font-family:Arial,sans-serif">
                <h2>Email Verification</h2>

                <p>Your verification code is:</p>

                <h1
                    style="
                        letter-spacing:5px;
                        color:#2563eb;
                    "
                >
                    ${otp}
                </h1>
                

                <p>This code expires in 10 minutes.</p>

                <p>If you didn't create an account, ignore this email.</p>
            </div>
        `,
    });
}