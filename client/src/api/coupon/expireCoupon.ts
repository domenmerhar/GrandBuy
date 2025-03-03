import { toApiPath } from "../../functions/toApiPath";

/**
 * Izbriše (izteče) kupon za prodajalca.
 * @param {object} arguments - Argumenti za izbris kupona.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.couponId - ID kupona, ki ga želimo izbrisati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await expireCoupon({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  couponId: '123456'
 * });
 */

export default async function expireCoupon({
  JWT,
  couponId,
}: {
  JWT: string;
  couponId: string;
}) {
  const Authorization = `Bearer ${JWT}`;

  const response = await fetch(toApiPath(`coupon/seller/${couponId}`), {
    method: "DELETE",
    headers: {
      Authorization,
    },
  });

  const data = await response.json();
  return data;
}
