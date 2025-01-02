import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductReviewStats } from "../../api/getProductReviewStats";

export const useReviewStats = () => {
  const { productId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviewStats", productId],
    queryFn: () => getProductReviewStats(productId!),
  });

  return { data, isLoading, error };
};
