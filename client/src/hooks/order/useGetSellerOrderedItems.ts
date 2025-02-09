import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";
import { useJWT } from "../useJWT";
import { getSellerOrderedItems } from "../../api/order/getSellerOrderedItems";

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
