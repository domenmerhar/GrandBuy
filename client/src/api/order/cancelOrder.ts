import { toApiPath } from "../../functions/toApiPath";

/**
 * Prekliče naročilo prodajalca.
 * @param {object} arguments - Argumenti za preklic naročila.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.orderId - ID naročila, ki ga želimo preklicati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await cancelOrder({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  orderId: '123456'
 * });
 */

export const cancelOrder = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/seller/${orderId}/cancel`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
