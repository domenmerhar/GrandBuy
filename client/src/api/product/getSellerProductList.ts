import { toApiPath } from "../../functions/toApiPath";

export default async function getSellerProductList(id: string, page = 1) {
  const limit = Number(import.meta.env.VITE_SELLER_PRODUCTS);

  const response = await fetch(
    toApiPath(`product/seller/${id}/list?limit=${limit}&page=${page}`)
  );
  const data = await response.json();

  const nextItem = data?.data?.products?.length === limit ? page + 1 : null;
  return { ...data, nextItem };
}
