import { toApiPath } from "../functions/toApiPath";

export const getSellerProducts = async (id: string, page = 1) => {
  const response = await fetch(
    toApiPath(`product/seller/${id}?limit=20&page=${page}`)
  );
  const data = await response.json();
  return data;
};
