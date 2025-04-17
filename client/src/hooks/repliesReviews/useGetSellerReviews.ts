import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";
import { SortCreatedAt } from "../../Util/types";
import { getSellerReviews } from "../../api/repliesReviews/getSellerReviews";

/**
 * useGetSellerReviews hook za pridobivanje ocen prodajalca s strani uporabnika.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje ocene prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: reviews, isLoading, isError } = useGetSellerReviews();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {reviews?.data.items.map(review => (
 * <div key={review._id}>{review.text}</div>
 * ))}
 * </div>
 * );
 */

export const useGetSellerReviews = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;
  const sortStr = String(searchParams.get("sort"));

  const page = Number(searchParams.get("page")) || 1;
  const sort: SortCreatedAt =
    sortStr === "oldest" ? "+createdAt" : "-createdAt";

  return useQuery({
    queryKey: ["seller-reviews", userId, page, sort],
    queryFn: () => getSellerReviews({ JWT, page, sort }),
  });
};
