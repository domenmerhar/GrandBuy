import { useQuery } from "@tanstack/react-query";
import { getWishlistItemByProductId } from "../../api/wishlist/getWishlistItemByProductId";
import { useAuthContext } from "../../contexts/AuthContext";

export const useWishlistItemByProductId = (productId: string) => {
  const [{ JWT, userId }] = useAuthContext();

  return useQuery({
    queryKey: ["wishlistItem", userId, productId],
    queryFn: () => getWishlistItemByProductId({ JWT, productId }),
  });
};
