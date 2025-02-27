import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import { getSellerRefunds } from "../../api/refund/getSellerRefunds";
import { useSearchParams } from "react-router-dom";
import { RefundStatus } from "../../Util/types";

export default function useGetSellerRefunds() {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;
  const page = Number(searchParams.get("page")) || 1;
  const status =
    searchParams.get("filter") === "all"
      ? undefined
      : (searchParams.get("filter") as RefundStatus);

  const sort =
    searchParams.get("sort") === "oldest" ? "+createdAt" : "-createdAt";

  return useQuery({
    queryKey: ["", userId, page, status, sort],
    queryFn: () => getSellerRefunds({ JWT, page, status, sort }),
  });
}
