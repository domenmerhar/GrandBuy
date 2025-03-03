import { toApiPath } from "../../functions/toApiPath";

interface SignupProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Registrira novega uporabnika s podanimi podatki.
 * @param {object} credentials - Podatki za registracijo uporabnika.
 * @param {string} credentials.username - Uporabniško ime.
 * @param {string} credentials.email - E-poštni naslov.
 * @param {string} credentials.password - Geslo.
 * @param {string} credentials.confirmPassword - Potrditev gesla.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await signup({
 *  username: 'novUporabnik',
 *  email: 'novi@uporabnik.com',
 *  password: 'MočnoGeslo123',
 *  confirmPassword: 'MočnoGeslo123'
 * });
 */

export const signup = async (credentials: SignupProps) => {
  const body = JSON.stringify(credentials);

  const response = await fetch(toApiPath("user/signup"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
};
