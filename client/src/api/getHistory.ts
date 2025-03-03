import { toApiPath } from "../functions/toApiPath";

/**
 * Pridobi zgodovino ogledanih izdelkov uporabnika s podporo za paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje zgodovine ogledanih izdelkov.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getHistory({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1
 * });
 */

export const getHistory = async ({
  JWT,
  page,
}: {
  JWT: string;
  page: number;
}) => {
  const limit = Number(import.meta.env.VITE_PRODUCT_PAGE_SIZE);

  const res = await fetch(toApiPath(`history?page=${page}&limit=${limit}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();
  const nextItem = data?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
