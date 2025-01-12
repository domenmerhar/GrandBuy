import { toApiPath } from "../../functions/toApiPath";

interface ChangePasswordArguments {
  JWT: string;
  password: string;
  confirmPassword: string;
}

export const changePassword = async ({
  JWT,
  password,
  confirmPassword,
}: ChangePasswordArguments) => {
  const body = JSON.stringify({ password, confirmPassword });

  const response = await fetch(toApiPath("user/change-password"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
    body,
  });

  const data = await response.json();
  return data;
};
