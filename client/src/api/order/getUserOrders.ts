import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi naročila uporabnika s podporo za paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje naročil.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getUserOrders({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1
 * });
 */

export const getUserOrders = async ({
  JWT,
  page,
}: {
  JWT: string;
  page: number;
}) => {
  const limit = Number(import.meta.env.VITE_ORDERS_PER_PAGE);

  const queryParamsStr = [
    limit && `limit=${limit}`,
    page && `page=${page}`,
  ].join("&");

  const res = await fetch(toApiPath(`order/user?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
