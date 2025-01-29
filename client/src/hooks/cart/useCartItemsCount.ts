import { useQuery } from "@tanstack/react-query";
import { getCartItemsCount } from "../../api/cart/getCartItemsCount";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

export const useCartItemsCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryFn: () => getCartItemsCount(JWT),
    queryKey: ["cartItemsCount", userId],
  });
};
