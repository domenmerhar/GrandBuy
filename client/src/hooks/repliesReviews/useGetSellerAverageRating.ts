import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import getSellerAverageRating from "../../api/repliesReviews/getSellerAverageRating";

/**
 * useSellerAverageRating hook za pridobivanje povprečne ocene prodajalca.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje povprečno oceno prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: averageRating, isLoading, isError } = useSellerAverageRating();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Povprečna ocena: {averageRating?.data.averageRating}</div>;
 */

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-average-rating", userId],
    queryFn: () => getSellerAverageRating({ JWT }),
  });
};
