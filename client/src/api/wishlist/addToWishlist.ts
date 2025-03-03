import { toApiPath } from "../../functions/toApiPath";

/**
 * Doda izdelek v seznam želja uporabnika.
 * @param {object} arguments - Argumenti za dodajanje izdelka v seznam želja.
 * @param {string} arguments.productId - ID izdelka, ki ga želimo dodati v seznam želja.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await addToWishlist({
 *  productId: '123456',
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * });
 */

export const addToWishlist = async ({
  productId,
  JWT,
}: {
  productId: string;
  JWT: string;
}) => {
  const res = await fetch(toApiPath(`wishlist/product/${productId}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
