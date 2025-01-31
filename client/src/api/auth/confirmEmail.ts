import { toApiPath } from "../../functions/toApiPath";

interface ConfirmProps {
  email: string;
  verificationCode: string;
}

export const confirmEmail = async ({
  email,
  verificationCode,
}: ConfirmProps) => {
  const body = JSON.stringify({ email });

  const response = await fetch(
    toApiPath(`user/confirm-email/${verificationCode}`),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );

  const data = await response.json();
  return data;
};
