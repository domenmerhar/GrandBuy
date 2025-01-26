import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { getUserOrdersCount } from "../../api/order/getUserOrdersCount";

export const useGetUserOrdersCount = () => {
  const [{ JWT, userId }] = useAuthContext();

  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrdersCount({ JWT }),
  });
};
