import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductReviewStats } from "../../api/product/getProductReviewStats";

interface IRatingBreakdown {
  rating: number;
  count: number;
  percentage: number;
}

/**
 * Hook za pridobivanje statističnih podatkov o mnenjih izdelkov.
 *
 * @returns {Object} Objekt, ki vsebuje podatke o mnenjih, stanje nalaganja, morebitne napake, povprečno oceno in razčlenitev ocen.
 *
 * @example
 * // Uporaba hooka
 * const { data, isLoading, error, averageRating, ratingBreakdowns } = useReviewStats();
 */

export const useReviewStats = () => {
  const { productId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviewStats", productId],
    queryFn: () => getProductReviewStats(productId!),
  });

  if (!data)
    return {
      data,
      isLoading,
      error,
      averageRating: null,
      ratingBreakdowns: [],
    };

  const averageRating = data?.data?.overallStats?.avgRating || 0;

  const ratingBreakdowns: IRatingBreakdown[] = Array.from({ length: 5 })
    .map(
      (_, i) =>
        data?.data?.ratingBreakdown.find(
          (ratingBreakdown: IRatingBreakdown) =>
            ratingBreakdown.rating === i + 1
        ) || { rating: i + 1, count: 0, percentage: 0 }
    )
    .reverse();

  return { data, isLoading, error, averageRating, ratingBreakdowns };
};
