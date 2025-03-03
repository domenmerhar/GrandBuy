import { ReviewSort } from "../Util/types";
import { toApiPath } from "./toApiPath";

/**
 * getReviews funkcija za pridobivanje ocen izdelka s strežnika.
 *
 * @async
 * @param {object} params - Parametri poizvedbe.
 * @param {string} params.productId - ID izdelka, za katerega pridobivamo ocene.
 * @param {number} params.page - Številka strani ocen.
 * @param {ReviewSort} [params.sort="-likesCount"] - Način sortiranja ocen (privzeto po številu všečkov padajoče).
 * @returns {Promise<any>} - Promise, ki se razreši s podatki o ocenah.
 * @throws {Error} - Če pride do napake pri pridobivanju podatkov.
 *
 * @example
 * // Uporaba funkcije
 * getReviews({ productId: "123", page: 1, sort: "+createdAt" })
 * .then(reviews => console.log(reviews))
 * .catch(error => console.error(error));
 */

export const getReviews = async ({
  productId,
  page,
  sort = "-likesCount",
}: {
  productId: string;
  page: number;
  sort: ReviewSort;
}) => {
  const response = await fetch(
    toApiPath(
      `review/product/${productId}?page=${page}${sort ? `&sort=${sort.replace("+", "%2B")}` : ""}`
    )
  );
  const data = await response.json();

  return data;
};
