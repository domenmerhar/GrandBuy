import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi število izdelkov v seznamu želja uporabnika.
 * @param {string} JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getWishlistItemCount('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export const getWishlistItemCount = async (JWT: string) => {
  const res = await fetch(toApiPath(`wishlist/count`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
