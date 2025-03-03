import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi izdelke iz seznama želja uporabnika s podporo za filtriranje in paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje izdelkov iz seznama želja.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {boolean} [arguments.sale] - Filtrira izdelke, ki so v akciji (imajo popust).
 * @param {number} [arguments.from] - Filtrira izdelke s ceno, ki je večja ali enaka tej vrednosti.
 * @param {number} [arguments.to] - Filtrira izdelke s ceno, ki je manjša ali enaka tej vrednosti.
 * @param {boolean} [arguments.freeShipping] - Filtrira izdelke z brezplačno dostavo.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getWishlistItems({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1,
 *  sale: true,
 *  from: 50,
 *  to: 200,
 *  freeShipping: true
 * });
 */

export const getWishlistItems = async ({
  JWT,
  page,
  from,
  to,
  sale,
  freeShipping,
}: {
  JWT: string;
  page: number;
  sale?: boolean;
  from?: number;
  to?: number;
  freeShipping?: boolean;
}) => {
  const limit = Number(import.meta.env.VITE_PRODUCTS_PER_STEPPER);

  const queryParamsStr = [
    freeShipping && "shipping[lte]=0",
    limit && `limit=${limit}`,
    page && `page=${page}`,
    sale && "discount[gt]=0",
    from && `totalPrice[gte]=${from}`,
    to && `totalPrice[lte]=${to}`,
  ]
    .filter((param) => !!param)
    .join("&");

  const res = await fetch(toApiPath(`wishlist?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
