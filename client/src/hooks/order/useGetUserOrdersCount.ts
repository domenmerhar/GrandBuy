import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { getUserOrdersCount } from "../../api/order/getUserOrdersCount";
import { useMe } from "../useMe";

export const useGetUserOrdersCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["seller-orders", userId],
    queryFn: () => getUserOrdersCount({ JWT }),
  });
};
