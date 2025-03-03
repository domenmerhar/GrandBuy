import { toApiPath } from "../../functions/toApiPath";

interface ChangePasswordArguments {
  JWT: string;
  password: string;
  confirmPassword: string;
}

/**
 * Spremeni uporabniško geslo.
 * @param {object} arguments - Argumenti za spremembo gesla.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.password - Novo geslo.
 * @param {string} arguments.confirmPassword - Potrditev novega gesla.
 * @returns {Promise<any>} - Odgovor na zahtevo.
 * @async
 * @example
 *  await changePassword({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  password: 'NovoGeslo123',
 *  confirmPassword: 'NovoGeslo123'
 * });
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
