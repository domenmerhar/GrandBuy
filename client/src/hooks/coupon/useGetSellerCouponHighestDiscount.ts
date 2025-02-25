import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import getSellerCouponHighestDiscount from "../../api/coupon/getSellerCouponHighestDiscount";

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["coupon-highest-discount", userId],
    queryFn: () => getSellerCouponHighestDiscount(JWT),
  });
};
