import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi povzetek košarice glede na podane ID-je elementov košarice.
 * @param {object} arguments - Argumenti za pridobivanje povzetka košarice.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string[]} arguments.cartItems - Array ID-jev elementov košarice.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getCartItemsSummary({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  cartItems: ['123456', '789012']
 * });
 */

export const getCartItemsSummary = async ({
  JWT,
  cartItems,
}: {
  JWT: string;
  cartItems: string[];
}) => {
  if (cartItems.length === 0)
    return {
      status: "success",
      data: {
        items: 0,
        shipping: 0,
        discount: 0,
        total: 0,
      },
    };

  const cartItemsStr = cartItems.sort().join(",");

  const res = await fetch(toApiPath(`cart/summary/${cartItemsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
