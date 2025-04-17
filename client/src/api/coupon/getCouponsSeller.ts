import { toApiPath } from "../../functions/toApiPath";
import { SortDiscount, SortExpireAt } from "../../Util/types";

/**
 * Pridobi kupone prodajalca s podporo za sortiranje in paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje kuponov.
 * @param {SortCreatedAt | SortDiscount} arguments.sort - Način sortiranja kuponov (po datumu ustvarjanja ali popustu).
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getCouponsSeller({
 *  sort: 'createdAt',
 *  page: 1,
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * });
 */

export const getCouponsSeller = async ({
  sort,
  page,
  JWT,
}: {
  sort: SortExpireAt | SortDiscount;
  page: number;
  JWT: string;
}) => {
  const limit = Number(import.meta.env.VITE_COUPONS_PER_PAGE);

  const response = await fetch(
    toApiPath(`coupon/seller?page=${page}&limit=${limit}&sort=${sort}`),
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  const data = await response.json();
  const nextItem = data?.data?.coupons?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
