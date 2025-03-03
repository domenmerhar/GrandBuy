import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import { getSellerReviews } from "../../api/repliesReviews/getSellerReviews";

/**
 * useSellerReviews hook za pridobivanje ocen prodajalca.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje ocene prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: reviews, isLoading, isError } = useSellerReviews();
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

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-reviews", userId, 1, "-createdAt"],
    queryFn: () => getSellerReviews({ JWT, page: 1, sort: "-createdAt" }),
  });
};
