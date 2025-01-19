import { useQuery } from "@tanstack/react-query";
import { getWishlistItems } from "../../api/wishlist/getWishlistItems";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";

export const useWishlistItems = () => {
  const [{ userId, JWT }] = useAuthContext();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const from = Number(searchParams.get("from")) || undefined;
  const to = Number(searchParams.get("to")) || undefined;
  const sale = searchParams.get("sale") === "true" || undefined;
  const freeShipping =
    searchParams.get("free-shipping") === "true" || undefined;

  return useQuery({
    queryKey: ["wishlistItems", userId, page, from, to, sale, freeShipping],
    queryFn: () =>
      getWishlistItems({
        JWT,
        page,
        from,
        to,
        sale,
        freeShipping,
      }),
  });
};
