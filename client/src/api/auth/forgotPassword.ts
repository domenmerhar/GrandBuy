import { toApiPath } from "../../functions/toApiPath";

/**
 * Zahteva ponastavitev pozabljenega gesla za uporabnika.
 * @param {object} arguments - Argumenti za zahtevo ponastavitve gesla.
 * @param {string} arguments.email - E-poštni naslov uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await forgotPassword({
 *  email: 'uporabnik@primer.com'
 * });
 */
export default async function forgotPassword({ email }: { email: string }) {
  const body = JSON.stringify({ email });

  const response = await fetch(toApiPath(`user/forgot-password`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
