import { useQuery } from "@tanstack/react-query";
import { getWishlistItemByProductId } from "../../api/wishlist/getWishlistItemByProductId";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

/**
 * useWishlistItemByProductId hook za pridobivanje izdelka na seznamu želja glede na ID izdelka.
 *
 * @param {string} productId - ID izdelka, za katerega želimo preveriti, ali je na seznamu želja.
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje podatke o izdelku na seznamu želja.
 *
 * @example
 * // Uporaba hook-a
 * const { data: wishlistItem, isLoading, isError } = useWishlistItemByProductId("product_id");
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * if (wishlistItem) {
 * // Izdelek je na seznamu želja
 * } else {
 * // Izdelek ni na seznamu želja
 * }
 */

export const useWishlistItemByProductId = (productId: string) => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["wishlistItem", userId, productId],
    queryFn: () => getWishlistItemByProductId({ JWT, productId }),
  });
};
