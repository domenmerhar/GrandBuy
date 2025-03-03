import { useQuery } from "@tanstack/react-query";
import { getWishlistItemCount } from "../../api/wishlist/getWishlistItemCount";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

/**
 * useWishlistItemCount hook za pridobivanje števila izdelkov na seznamu želja.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje število izdelkov na seznamu želja.
 *
 * @example
 * // Uporaba hook-a
 * const { data: count, isLoading, isError } = useWishlistItemCount();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Število izdelkov na seznamu želja: {count?.data.count}</div>;
 */

export const useWishlistItemCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["wishlistItemCount", userId],
    queryFn: () => getWishlistItemCount(JWT),
  });
};
