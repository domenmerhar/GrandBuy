import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import getSellerAverageRating from "../../api/repliesReviews/getSellerAverageRating";

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-average-rating", userId],
    queryFn: () => getSellerAverageRating({ JWT }),
  });
};
