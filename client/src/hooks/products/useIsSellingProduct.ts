import { useProduct } from "../../pages/product/useProduct";
import { useMe } from "../useMe";

/**
 * useIsSellingProduct hook za preverjanje, ali je trenutni uporabnik prodajalec izdelka.
 *
 * @returns {boolean} - Vrne `true`, če je trenutni uporabnik prodajalec izdelka, sicer `false`.
 *
 * @example
 * // Uporaba hook-a
 * const isSeller = useIsSellingProduct();
 * if (isSeller) {
 * // Prikaz gumbov za urejanje izdelka
 * }
 */

export const useIsSellingProduct = () => {
  const { data: userData } = useMe();
  const { data: productData } = useProduct();

  const userId = userData?.data?._id;
  const sellerId = productData?.data?.product?.user?._id;

  if (!userId && !sellerId) return false;

  return sellerId === userId;
};
