import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi število elementov v košarici uporabnika.
 * @param {string} JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getCartItemsCount('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export const getCartItemsCount = async (JWT: string) => {
  const res = await fetch(toApiPath("cart/count"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
