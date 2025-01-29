import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { getUserOrders } from "../../api/order/getUserOrders";
import { useMe } from "../useMe";

export const useGetUserOrders = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  const page = Number(searchParams.get("page")) || 1;

  return useQuery({
    queryKey: ["orders", userId, page],
    queryFn: () => getUserOrders({ JWT, page }),
  });
};
