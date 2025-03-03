import { useQuery } from "@tanstack/react-query";
import { getCartItemsCount } from "../../api/cart/getCartItemsCount";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

/**
 * useCartItemsCount hook za pridobivanje števila izdelkov v košarici.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje število izdelkov v košarici.
 *
 * @example
 * // Uporaba hook-a
 * const { data: count, isLoading, isError } = useCartItemsCount();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Število izdelkov v košarici: {count?.data.count}</div>;
 */

export const useCartItemsCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryFn: () => getCartItemsCount(JWT),
    queryKey: ["cartItemsCount", userId],
  });
};
