import { toApiPath } from "../../functions/toApiPath";

/**
 * Ustvari nov kupon za prodajalca.
 * @param {object} arguments - Argumenti za ustvarjanje kupona.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.code - Koda kupona.
 * @param {string[]} arguments.products - Array ID-jev izdelkov, na katere se kupon nanaša.
 * @param {number} arguments.discount - Popust kupona (npr. 10 za 10%).
 * @param {Date} arguments.expireAt - Datum in čas izteka kupona.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await createCouponSeller({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  code: 'POPUST15',
 *  products: ['123456', '789012'],
 *  discount: 15,
 *  expireAt: new Date('2024-12-31T23:59:59Z')
 * });
 */

export default async function createCouponSeller({
  JWT,
  code,
  products,
  discount,
  expireAt,
}: {
  JWT: string;
  code: string;
  products: string[];
  discount: number;
  expireAt: Date;
}) {
  const Authorization = `Bearer ${JWT}`;
  const body = JSON.stringify({ code, products, discount, expireAt });

  const response = await fetch(toApiPath(`coupon/seller`), {
    method: "POST",
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
