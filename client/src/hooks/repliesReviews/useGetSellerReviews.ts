import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";
import { SortCreatedAt } from "../../Util/types";
import { getSellerReviews } from "../../api/repliesReviews/getSellerReviews";

export const useGetSellerReviews = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;
  const sortStr = String(searchParams.get("sort"));

  const page = Number(searchParams.get("page")) || 1;
  const sort: SortCreatedAt =
    sortStr === "oldest" ? "-createdAt" : "+createdAt";

  return useQuery({
    queryKey: ["seller-reviews", userId, page, sort],
    queryFn: () => getSellerReviews({ JWT, page, sort }),
  });
};
