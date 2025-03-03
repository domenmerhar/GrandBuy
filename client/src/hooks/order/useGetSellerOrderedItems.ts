import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";
import { useJWT } from "../useJWT";
import { getSellerOrderedItems } from "../../api/order/getSellerOrderedItems";

/**
 * useGetSellerOrderedItems hook za pridobivanje naročenih izdelkov prodajalca.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje naročene izdelke prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: orders, isLoading, isError } = useGetSellerOrderedItems();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {orders?.data.items.map(order => (
 * <div key={order._id}>{order.product.name}</div>
 * ))}
 * </div>
 * );
 */

export const useGetSellerOrderedItems = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useJWT();
  const { data } = useMe();

  const sortStr = searchParams.get("sort");
  const filterStr = searchParams.get("filter")!;

  const sellerId = data?.data?._id;
  const page = Number(searchParams.get("page")) || 1;
  const sort = sortStr === "oldest" ? "+createdAt" : "-createdAt";
  const filter = [
    "all",
    "pending",
    "cancelled",
    "shipped",
    "delivered",
  ].includes(filterStr)
    ? (filterStr as "pending" | "cancelled" | "delivered")
    : "all";

  return useQuery({
    queryKey: ["seller-orders", sellerId, page, sort, filter],
    queryFn: () => getSellerOrderedItems({ JWT, page, sort, filter }),
  });
};
