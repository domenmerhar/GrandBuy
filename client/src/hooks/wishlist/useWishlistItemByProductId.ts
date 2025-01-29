import { useQuery } from "@tanstack/react-query";
import { getWishlistItemByProductId } from "../../api/wishlist/getWishlistItemByProductId";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

export const useWishlistItemByProductId = (productId: string) => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["wishlistItem", userId, productId],
    queryFn: () => getWishlistItemByProductId({ JWT, productId }),
  });
};
