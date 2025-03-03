import { toApiPath } from "../../functions/toApiPath";

/**
 * Posodobi kupon prodajalca.
 * @param {object} arguments - Argumenti za posodobitev kupona.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.couponId - ID kupona, ki ga želimo posodobiti.
 * @param {string[]} arguments.products - Array ID-jev izdelkov, na katere se kupon nanaša.
 * @param {number} arguments.discount - Popust kupona (npr. 10 za 10%).
 * @param {Date} arguments.expireAt - Datum in čas izteka kupona.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await updateCouponSeller({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  couponId: '123456',
 *  products: ['789012', '345678'],
 *  discount: 20,
 *  expireAt: new Date('2025-01-01T00:00:00Z')
 * });
 */

export default async function updateCouponSeller({
  JWT,
  couponId,
  products,
  discount,
  expireAt,
}: {
  JWT: string;
  couponId: string;
  products: string[];
  discount: number;
  expireAt: Date;
}) {
  const Authorization = `Bearer ${JWT}`;
  const body = JSON.stringify({ products, discount, expireAt });

  const response = await fetch(toApiPath(`coupon/seller/${couponId}`), {
    method: "PATCH",
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
