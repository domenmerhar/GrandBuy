import { useQuery } from "@tanstack/react-query";
import { getCartItemsCount } from "../../api/cart/getCartItemsCount";
import { useAuthContext } from "../../contexts/AuthContext";

export const useCartItemsCount = () => {
  const [{ JWT, userId }] = useAuthContext();

  return useQuery({
    queryFn: () => getCartItemsCount(JWT),
    queryKey: ["cartItemsCount", userId],
  });
};
