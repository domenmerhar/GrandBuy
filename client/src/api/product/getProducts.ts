import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi seznam izdelkov s podporo za iskanje, filtriranje, sortiranje in paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje izdelkov.
 * @param {string} arguments.query - Iskalni niz za iskanje izdelkov.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {boolean} [arguments.freeShipping] - Filtrira izdelke z brezplačno dostavo.
 * @param {boolean} [arguments.sale] - Filtrira izdelke, ki so v akciji (imajo popust).
 * @param {number} [arguments.rating] - Filtrira izdelke z oceno, ki je enaka ali večja od podane vrednosti.
 * @param {number} [arguments.from] - Filtrira izdelke s ceno, ki je večja ali enaka tej vrednosti.
 * @param {number} [arguments.to] - Filtrira izdelke s ceno, ki je manjša ali enaka tej vrednosti.
 * @param {string} [arguments.sort] - Način sortiranja izdelkov (npr. "price", "-price", "rating").
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getProducts({
 *  query: 'izdelk',
 *  page: 1,
 *  freeShipping: true,
 *  sale: true,
 *  rating: 4,
 *  from: 50,
 *  to: 200,
 *  sort: '-price'
 * });
 */

export const getProducts = async ({
  query,
  page,
  freeShipping,
  sale,
  from,
  to,
  rating,
  sort,
}: {
  query: string;
  page: number;
  freeShipping?: boolean;
  sale?: boolean;
  rating?: number;
  from?: number;
  to?: number;
  sort?: string;
}) => {
  const limit = Number(import.meta.env.VITE_PRODUCT_PAGE_SIZE);

  const queryParamsStr = [
    freeShipping && "shipping[lte]=0",
    sale && "discount[gt]=0",
    from && `totalPrice[gte]=${from}`,
    to && `totalPrice[lte]=${to}`,
    rating && `averageRating=${rating}`,
    sort && `sort=${sort}`,
  ]
    .filter((param) => !!param)
    .join("&");

  const queryParams = queryParamsStr ? `&${queryParamsStr}` : "";

  const response = await fetch(
    toApiPath(
      `product?search=${query}&page=${page}${queryParams}&limit=${limit}`
    )
  );

  const data = await response.json();
  const nextItem = data?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
