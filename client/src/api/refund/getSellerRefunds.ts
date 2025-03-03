import { toApiPath } from "../../functions/toApiPath";
import { RefundStatus, SortCreatedAt } from "../../Util/types";

/**
 * Pridobi zahteve za vračilo prodajalca s podporo za filtriranje, sortiranje in paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje zahtev za vračilo.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {RefundStatus} [arguments.status] - Status zahtev za vračilo (neobvezno).
 * @param {SortCreatedAt} arguments.sort - Način sortiranja zahtev za vračilo (po datumu ustvarjanja).
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getSellerRefunds({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1,
 *  status: 'pending',
 *  sort: '-createdAt'
 * });
 */

export const getSellerRefunds = async ({
  JWT,
  page,
  status,
  sort,
}: {
  JWT: string;
  page: number;
  status?: RefundStatus;
  sort: SortCreatedAt;
}) => {
  const limit = Number(import.meta.env.VITE_REFUNDS_NOTIFICATIONS_PAGE_SIZE);

  const res = await fetch(
    toApiPath(
      `refund/seller?page=${page}&limit=${limit}&sort=${sort}${status ? `&status=${status}` : ""}`
    ),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  const data = await res.json();
  const nextItem = data?.refunds?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
