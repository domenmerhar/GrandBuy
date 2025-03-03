import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import getSellerCouponsCount from "../../api/coupon/getSellerCouponsCount";

/**
 * useSellerCouponsCount hook za pridobivanje števila kuponov prodajalca.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje število kuponov prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: count, isLoading, isError } = useSellerCouponsCount();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Število kuponov: {count?.data.count}</div>;
 */

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["coupon-count", userId],
    queryFn: () => getSellerCouponsCount(JWT),
  });
};
