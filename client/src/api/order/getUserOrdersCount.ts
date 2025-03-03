import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi število naročil uporabnika.
 * @param {object} arguments - Argumenti za pridobivanje števila naročil.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 *  await getUserOrdersCount({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * });
 */

export const getUserOrdersCount = async ({ JWT }: { JWT: string }) => {
  const res = await fetch(toApiPath(`order/user/count`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
