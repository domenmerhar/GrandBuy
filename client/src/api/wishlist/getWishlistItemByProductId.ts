import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi izdelek iz seznama želja uporabnika glede na ID izdelka.
 * @param {object} arguments - Argumenti za pridobivanje izdelka iz seznama želja.
 * @param {string} arguments.productId - ID izdelka, ki ga želimo pridobiti iz seznama želja.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getWishlistItemByProductId({
 *  productId: '123456',
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * });
 */

export const getWishlistItemByProductId = async ({
  productId,
  JWT,
}: {
  productId: string;
  JWT: string;
}) => {
  const res = await fetch(toApiPath(`wishlist/product/${productId}`), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
