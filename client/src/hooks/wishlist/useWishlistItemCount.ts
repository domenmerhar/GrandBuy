import { useQuery } from "@tanstack/react-query";
import { getWishlistItemCount } from "../../api/wishlist/getWishlistItemCount";
import { useAuthContext } from "../../contexts/AuthContext";

export const useWishlistItemCount = () => {
  const [{ JWT, userId }] = useAuthContext();

  return useQuery({
    queryKey: ["wishlistItemCount", userId],
    queryFn: () => getWishlistItemCount(JWT),
  });
};
