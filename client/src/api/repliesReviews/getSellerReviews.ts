import { toApiPath } from "../../functions/toApiPath";
import { SortCreatedAt } from "../../Util/types";

/**
 * Pridobi ocene prodajalca s podporo za paginacijo in sortiranje.
 * @param {object} arguments - Argumenti za pridobivanje ocen prodajalca.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {SortCreatedAt} arguments.sort - Način sortiranja ocen (po datumu ustvarjanja).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getSellerReviews({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1,
 *  sort: '-createdAt'
 * });
 */

export const getSellerReviews = async ({
  JWT,
  page,
  sort,
}: {
  JWT: string;
  page: number;
  sort: SortCreatedAt;
}) => {
  const limit = Number(import.meta.env.VITE_SELLER_REVIEWS_PAGE);

  const queryParamsStr = [
    limit && `limit=${limit}`,
    page && `page=${page}`,
    sort && `sort=${sort}`,
  ].join("&");

  const res = await fetch(toApiPath(`review/seller?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
