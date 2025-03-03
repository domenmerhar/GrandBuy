import { useQuery } from "@tanstack/react-query";
import { useMe } from "../useMe";
import { useJWT } from "../useJWT";
import { getSellerOrderedItems } from "../../api/order/getSellerOrderedItems";

/**
 * usePendingOrders hook za pridobivanje čakajočih naročil prodajalca.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje čakajoča naročila prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: pendingOrders, isLoading, isError } = usePendingOrders();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {pendingOrders?.data.items.map(order => (
 * <div key={order._id}>{order._id}</div>
 * ))}
 * </div>
 * );
 */

export const usePendingOrders = () => {
  const { JWT } = useJWT();
  const { data } = useMe();

  const sellerId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-orders", sellerId, 1, "-createdAt", "pending"],
    queryFn: () =>
      getSellerOrderedItems({
        JWT,
        page: 1,
        sort: "-createdAt",
        filter: "pending",
      }),
  });
};
