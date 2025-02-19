import { useQuery } from "@tanstack/react-query";
import { useMe } from "../useMe";
import { useJWT } from "../useJWT";
import { getSellerOrderedItems } from "../../api/order/getSellerOrderedItems";

export const usePendingOrders = () => {
  const { JWT } = useJWT();
  const { data } = useMe();

  const sellerId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-orders", sellerId, 1, "-createdAt", "all"],
    queryFn: () =>
      getSellerOrderedItems({
        JWT,
        page: 1,
        sort: "-createdAt",
        filter: "pending",
      }),
  });
};
