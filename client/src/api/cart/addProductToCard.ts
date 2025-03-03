import { toApiPath } from "../../functions/toApiPath";

/**
 * Doda izdelek v košarico uporabnika.
 * @param {object} arguments - Argumenti za dodajanje izdelka v košarico.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.productId - ID izdelka, ki ga želimo dodati v košarico.
 * @param {number} arguments.quantity - Količina izdelka, ki ga želimo dodati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await addProductToCart({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  productId: '123456',
 *  quantity: 1
 * });
 */
export const addProductToCart = async ({
  JWT,
  productId,
  quantity,
}: {
  JWT: string;
  productId: string;
  quantity: number;
}) => {
  const body = JSON.stringify({ quantity });

  const res = await fetch(toApiPath(`cart/add/${productId}`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
};
