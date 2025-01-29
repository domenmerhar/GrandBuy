import { useQuery } from "@tanstack/react-query";
import { getWishlistItemCount } from "../../api/wishlist/getWishlistItemCount";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

export const useWishlistItemCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["wishlistItemCount", userId],
    queryFn: () => getWishlistItemCount(JWT),
  });
};
