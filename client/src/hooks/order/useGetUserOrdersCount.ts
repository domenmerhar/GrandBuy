import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { getUserOrdersCount } from "../../api/order/getUserOrdersCount";
import { useMe } from "../useMe";

/**
 * useGetUserOrdersCount hook za pridobivanje števila naročil uporabnika.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje število naročil uporabnika.
 *
 * @example
 * // Uporaba hook-a
 * const { data: count, isLoading, isError } = useGetUserOrdersCount();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Število naročil: {count?.data.count}</div>;
 */

export const useGetUserOrdersCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-orders", userId],
    queryFn: () => getUserOrdersCount({ JWT }),
  });
};
