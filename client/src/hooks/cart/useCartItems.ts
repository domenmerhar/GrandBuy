import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../api/cart/getCartItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";

export const useCartItems = () => {
  const [searchParams] = useSearchParams();
  const [{ JWT, userId }] = useAuthContext();

  const page = Number(searchParams.get("page")) || 1;
  const from = Number(searchParams.get("from")) || undefined;
  const to = Number(searchParams.get("to")) || undefined;
  const sale = searchParams.get("sale") === "true" || undefined;
  const freeShipping =
    searchParams.get("free-shipping") === "true" || undefined;

  return useQuery({
    queryKey: ["cartItems", userId, page, freeShipping, from, sale, to],
    queryFn: () => getCartItems({ JWT, page, freeShipping, from, sale, to }),
  });
};
