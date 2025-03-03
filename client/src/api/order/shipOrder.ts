import { toApiPath } from "../../functions/toApiPath";

/**
 * Označi naročilo prodajalca kot odposlano.
 * @param {object} arguments - Argumenti za označevanje naročila kot odposlanega.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.orderId - ID naročila, ki ga želimo označiti kot odposlanega.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await shipOrder({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  orderId: '123456'
 * });
 */

export const shipOrder = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/seller/${orderId}/ship`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
