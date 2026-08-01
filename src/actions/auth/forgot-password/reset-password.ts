interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export async function resetPassword({
  token,
  newPassword,
}: ResetPasswordPayload): Promise<string> {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to reset your password."
    );
  }

  return (
    data.message ??
    "Your password has been updated successfully."
  );
}