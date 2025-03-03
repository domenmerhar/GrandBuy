import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi statistiko ocen izdelka s podanim ID-jem.
 * @param {string} productId - ID izdelka, za katerega želimo pridobiti statistiko ocen.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getProductReviewStats('123456');
 */

export const getProductReviewStats = async (productId: string) => {
  const response = await fetch(toApiPath(`review/product/${productId}/stats`));
  const data = await response.json();

  return data;
};
