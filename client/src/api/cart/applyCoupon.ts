import { toApiPath } from "../../functions/toApiPath";

/**
 * Uporabi kupon na košarico uporabnika.
 * @param {object} arguments - Argumenti za uporabo kupona.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.couponCode - Koda kupona, ki ga želimo uporabiti.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await applyCoupon({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  couponCode: 'POPUST10'
 * });
 */

export const applyCoupon = async ({
  JWT,
  couponCode,
}: {
  JWT: string;
  couponCode: string;
}) => {
  const res = await fetch(toApiPath(`cart/apply-coupon/${couponCode}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
