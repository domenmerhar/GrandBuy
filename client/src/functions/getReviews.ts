import { toApiPath } from "./toApiPath";

export const getReviews = async (productId: string, page: number) => {
  const response = await fetch(
    toApiPath(`review/product/${productId}?page=${page}`)
  );
  const data = await response.json();

  return data;
};
