import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { getCartItemsSummary } from "../../api/cart/getCartItemsSummary";
import { useMe } from "../useMe";

export const useGetCartItemsSummary = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();
  const [searchParams] = useSearchParams();

  const userId = data?.data?._id;

  const cartItems = searchParams.get("products")?.split(",") || [];

  return useQuery({
    queryKey: ["cartItemsSummary", userId, cartItems],
    queryFn: () =>
      getCartItemsSummary({
        JWT,
        cartItems,
      }),
  });
};
