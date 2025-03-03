import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { getUserOrders } from "../../api/order/getUserOrders";
import { useMe } from "../useMe";

/**
 * useGetUserOrders hook za pridobivanje naročil uporabnika.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje naročila uporabnika.
 *
 * @example
 * // Uporaba hook-a
 * const { data: orders, isLoading, isError } = useGetUserOrders();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {orders?.data.items.map(order => (
 * <div key={order._id}>{order._id}</div>
 * ))}
 * </div>
 * );
 */

export const useGetUserOrders = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  const page = Number(searchParams.get("page")) || 1;

  return useQuery({
    queryKey: ["orders", userId, page],
    queryFn: () => getUserOrders({ JWT, page }),
  });
};
