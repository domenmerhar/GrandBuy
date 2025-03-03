import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { getCartItemsSummary } from "../../api/cart/getCartItemsSummary";
import { useMe } from "../useMe";

/**
 * useGetCartItemsSummary hook za pridobivanje povzetka izdelkov v košarici.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje povzetek izdelkov v košarici.
 *
 * @example
 * // Uporaba hook-a
 * const { data: summary, isLoading, isError } = useGetCartItemsSummary();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * <p>Skupna cena: {summary?.data.totalPrice}</p>
 * <p>Število izdelkov: {summary?.data.totalQuantity}</p>
 * </div>
 * );
 */

export const useGetCartItemsSummary = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();
  const [searchParams] = useSearchParams();

  const userId = data?.data?._id;

  const cartItems = searchParams.get("products")?.split(",") || [];

  return useQuery({
    queryKey: ["cartItemsSummary", userId, cartItems],
    queryFn: () =>
      getCartItemsSummary({
        JWT,
        cartItems,
      }),
  });
};
