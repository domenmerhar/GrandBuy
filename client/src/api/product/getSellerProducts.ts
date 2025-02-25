import { toApiPath } from "../../functions/toApiPath";

export const getSellerProducts = async (id: string, page = 1) => {
  const limit = Number(import.meta.env.VITE_SELLER_PRODUCTS);

  const response = await fetch(
    toApiPath(`product/seller/${id}?limit=${limit}&page=${page}`)
  );
  const data = await response.json();

  const nextItem = data?.products?.length === limit ? page + 1 : null;
  return { ...data, nextItem };
};
