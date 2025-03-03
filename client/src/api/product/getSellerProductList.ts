import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi seznam izdelkov prodajalca s podanim ID-jem in podporo za paginacijo.
 * @param {string} id - ID prodajalca, katerega izdelke želimo pridobiti.
 * @param {number} [page=1] - Številka strani za paginacijo (privzeto 1).
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getSellerProductList('123456', 2);
 */

export default async function getSellerProductList(id: string, page = 1) {
  const limit = Number(import.meta.env.VITE_SELLER_PRODUCTS);

  const response = await fetch(
    toApiPath(`product/seller/${id}/list?limit=${limit}&page=${page}`)
  );
  const data = await response.json();

  const nextItem = data?.data?.products?.length === limit ? page + 1 : null;
  return { ...data, nextItem };
}
