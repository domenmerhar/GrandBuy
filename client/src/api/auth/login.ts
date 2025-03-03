import { toApiPath } from "../../functions/toApiPath";

/**
 * Prijavi uporabnika s podanim e-poštnim naslovom in geslom.
 * @param {object} arguments - Argumenti za prijavo.
 * @param {string} arguments.email - E-poštni naslov uporabnika.
 * @param {string} arguments.password - Geslo uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await login({
 *  email: 'uporabnik@primer.com',
 *  password: 'Geslo123'
 * });
 */
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(toApiPath("user/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};
