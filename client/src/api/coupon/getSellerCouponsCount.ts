import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi število kuponov prodajalca.
 * @param {string} JWT - JWT (JSON Web Token) prodajalca.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getSellerCouponsCount('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export default async (JWT: string) => {
  const response = await fetch(toApiPath(`coupon/seller/count`), {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await response.json();

  return data;
};
