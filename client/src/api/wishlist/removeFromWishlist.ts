import { toApiPath } from "../../functions/toApiPath";

/**
 * Odstrani izdelek iz seznama želja uporabnika.
 * @param {object} arguments - Argumenti za odstranjevanje izdelka iz seznama želja.
 * @param {string} arguments.productId - ID izdelka, ki ga želimo odstraniti iz seznama želja.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await removeFromWishlist({
 *  productId: '123456',
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * });
 */

export const removeFromWishlist = async ({
  productId,
  JWT,
}: {
  productId: string;
  JWT: string;
}) => {
  const res = await fetch(toApiPath(`wishlist/product/${productId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
