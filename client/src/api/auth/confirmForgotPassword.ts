import { toApiPath } from "../../functions/toApiPath";

export default async function confirmForgotPassword({
  email,
  verificationCode,
  password,
  confirmPassword,
}: {
  email: string;
  verificationCode: number;
  password: string;
  confirmPassword: string;
}) {
  const body = JSON.stringify({
    email,
    verificationCode,
    password,
    confirmPassword,
  });

  const response = await fetch(toApiPath(`user/confirm-forgot-password`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
