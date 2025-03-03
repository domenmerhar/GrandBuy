import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi povprečno oceno prodajalca.
 * @param {object} arguments - Argumenti za pridobivanje povprečne ocene.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getSellerAverageRating({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * });
 */

export default async ({ JWT }: { JWT: string }) => {
  const res = await fetch(toApiPath(`review/seller/average-rating`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
