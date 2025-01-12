import { toApiPath } from "../../functions/toApiPath";

export const getProductReviewStats = async (productId: string) => {
  const response = await fetch(toApiPath(`review/product/${productId}/stats`));
  const data = await response.json();

  return data;
};
