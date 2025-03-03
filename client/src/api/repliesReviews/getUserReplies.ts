import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi odgovore uporabnika na ocene s podporo za paginacijo in sortiranje.
 * @param {object} arguments - Argumenti za pridobivanje odgovorov uporabnika.
 * @param {string} arguments.userId - ID uporabnika, katerega odgovore želimo pridobiti.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {"-createdAt" | "+createdAt"} arguments.sort - Način sortiranja odgovorov (po datumu ustvarjanja, padajoče ali naraščajoče).
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getUserReplies({
 *  userId: '123456',
 *  page: 1,
 *  sort: '-createdAt'
 * });
 */

export const getUserReplies = async ({
  userId,
  page,
  sort,
}: {
  userId: string;
  page: number;
  sort: "-createdAt" | "+createdAt";
}) => {
  const limit = Number(import.meta.env.VITE_USER_REVIEWS_PAGE_SIZE);

  const response = await fetch(
    toApiPath(`reply/user/${userId}?page=${page}&limit=${limit}&sort=${sort}`)
  );

  const data = await response.json();

  const nextItem = data?.data?.replies?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
