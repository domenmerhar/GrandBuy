import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import { getSellerReviews } from "../../api/repliesReviews/getSellerReviews";

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-reviews", userId, 1, "-createdAt"],
    queryFn: () => getSellerReviews({ JWT, page: 1, sort: "-createdAt" }),
  });
};
