import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import getSellerCouponsCount from "../../api/coupon/getSellerCouponsCount";

export default () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["coupon-count", userId],
    queryFn: () => getSellerCouponsCount(JWT),
  });
};
