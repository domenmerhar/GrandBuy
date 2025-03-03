import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ReviewSort } from "../../Util/types";
import { getReviews } from "../../functions/getReviews";

export const useReviews = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const sort = (searchParams.get("sort") as ReviewSort) || "-likesCount";

  return useQuery({
    queryKey: ["reviews", productId, page, sort],
    queryFn: () =>
      getReviews({
        productId: productId!,
        page,
        sort,
      }),
  });
};
