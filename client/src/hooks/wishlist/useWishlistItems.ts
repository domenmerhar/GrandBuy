import { useQuery } from "@tanstack/react-query";
import { getWishlistItems } from "../../api/wishlist/getWishlistItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";

/**
 * useWishlistItems hook za pridobivanje izdelkov na seznamu želja.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje izdelke na seznamu želja.
 *
 * @example
 * // Uporaba hook-a
 * const { data: wishlistItems, isLoading, isError } = useWishlistItems();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {wishlistItems?.data.items.map(item => (
 * <div key={item._id}>{item.product.name}</div>
 * ))}
 * </div>
 * );
 */

export const useWishlistItems = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const from = Number(searchParams.get("from")) || undefined;
  const to = Number(searchParams.get("to")) || undefined;
  const sale = searchParams.get("sale") === "true" || undefined;
  const freeShipping =
    searchParams.get("free-shipping") === "true" || undefined;

  return useQuery({
    queryKey: [
      "wishlistItems",
      data?.data?._id,
      page,
      from,
      to,
      sale,
      freeShipping,
    ],
    queryFn: () =>
      getWishlistItems({
        JWT,
        page,
        from,
        to,
        sale,
        freeShipping,
      }),
  });
};
