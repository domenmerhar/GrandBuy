import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import getSellerCouponHighestDiscount from "../../api/coupon/getSellerCouponHighestDiscount";

/**
 * useSellerCouponHighestDiscount hook za pridobivanje kupona prodajalca z najvišjim popustom.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje kupon z najvišjim popustom.
 *
 * @example
 * // Uporaba hook-a
 * const { data: coupon, isLoading, isError } = useSellerCouponHighestDiscount();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Najvišji popust: {coupon?.data.discount}%</div>;
 */

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["coupon-highest-discount", userId],
    queryFn: () => getSellerCouponHighestDiscount(JWT),
  });
};
