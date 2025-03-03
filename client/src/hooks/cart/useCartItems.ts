import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../api/cart/getCartItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";

/**
 * useCartItems hook za pridobivanje izdelkov v košarici.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje podatke o izdelkih v košarici.
 *
 * @example
 * // Uporaba hook-a
 * const { data, isLoading, isError } = useCartItems();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {data?.data.items.map(item => (
 * <div key={item._id}>{item.product.name}</div>
 * ))}
 * </div>
 * );
 */

export const useCartItems = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  const page = Number(searchParams.get("page")) || 1;
  const from = Number(searchParams.get("from")) || undefined;
  const to = Number(searchParams.get("to")) || undefined;
  const sale = searchParams.get("sale") === "true" || undefined;
  const freeShipping =
    searchParams.get("free-shipping") === "true" || undefined;

  return useQuery({
    queryKey: ["cartItems", userId, page, freeShipping, from, sale, to],
    queryFn: () => getCartItems({ JWT, page, freeShipping, from, sale, to }),
  });
};
