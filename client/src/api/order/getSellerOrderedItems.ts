import { toApiPath } from "../../functions/toApiPath";
import { SortCreatedAt } from "../../Util/types";

/**
 * Pridobi naročene izdelke prodajalca s podporo za filtriranje, sortiranje in paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje naročenih izdelkov.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {SortCreatedAt} arguments.sort - Način sortiranja izdelkov (po datumu ustvarjanja).
 * @param {"all" | "pending" | "cancelled" | "delivered"} arguments.filter - Filter za status naročila (vsa, čakajoča, preklicana, dostavljena).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getSellerOrderedItems({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1,
 *  sort: '-createdAt',
 *  filter: 'pending'
 * });
 */

export const getSellerOrderedItems = async ({
  JWT,
  page,
  sort,
  filter,
}: {
  JWT: string;
  page: number;
  sort: SortCreatedAt;
  filter: "all" | "pending" | "cancelled" | "delivered";
}) => {
  const limit = Number(import.meta.env.VITE_SELLER_ORDERS_PER_PAGE);

  const queryParamsStr = [
    `limit=${limit}`,
    `page=${page}`,
    `sort=${sort}`,
    `filter=${filter}`,
  ].join("&");

  const res = await fetch(toApiPath(`cart/seller?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
