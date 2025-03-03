import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi ocene uporabnika s podporo za paginacijo in sortiranje.
 * @param {string} userId - ID uporabnika, katerega ocene želimo pridobiti.
 * @param {number} page - Številka strani za paginacijo.
 * @param {string} [sort="-likes"] - Način sortiranja ocen (privzeto po številu všečkov, padajoče).
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getUserReviews('123456', 1, '-createdAt');
 */

export const getUserReviews = async (
  userId: string,
  page: number,
  sort: string = "-likes"
) => {
  const limit = Number(import.meta.env.VITE_USER_REVIEWS_PAGE_SIZE);

  const response = await fetch(
    toApiPath(`review?sort=${sort}&user=${userId}&page=${page}&limit=${limit}`)
  );

  const data = await response.json();

  const nextItem = data?.data?.doc?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
