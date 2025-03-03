import { toApiPath } from "../../functions/toApiPath";

/**
 * Potrdi dostavo naročila s strani uporabnika.
 * @param {object} arguments - Argumenti za potrditev dostave naročila.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.orderId - ID naročila, katerega dostavo potrjujemo.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await confirmOrderDelivery({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  orderId: '123456'
 * });
 */

export const confirmOrderDelivery = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/user/${orderId}/confirmDelivery`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
