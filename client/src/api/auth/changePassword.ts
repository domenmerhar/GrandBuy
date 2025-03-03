import { toApiPath } from "../../functions/toApiPath";

interface ChangePasswordArguments {
  JWT: string;
  password: string;
  confirmPassword: string;
}

/**
 * dsahji
 * @param {string} JWT - JWT of the user
 * @param {string} password - New password
 * @param {string} confirmPassword - Confirm new password
 * @returns {Promise} - Promise object represents the response
 */

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
