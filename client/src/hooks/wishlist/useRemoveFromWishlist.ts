import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeFromWishlist } from "../../api/wishlist/removeFromWishlist";
import { useMe } from "../useMe";

export const useRemoveFromWishlist = (productId: string) => {
  const { data } = useMe();
  const client = useQueryClient();

  const userId = data?.data?._id;

  return useMutation({
    mutationFn: removeFromWishlist,

    onMutate: () => {
      toast.loading("Removing from wishlist...", { id: "add-to-wishlist" });
    },

    onSettled: () => {
      toast.success("Removed from wishlist", { id: "add-to-wishlist" });

      client.invalidateQueries({
        queryKey: ["wishlistItem", userId, productId],
      });

      client.invalidateQueries({
        queryKey: ["wishlistItemCount", userId],
      });

      client.invalidateQueries({
        predicate: (query) => query.queryKey.includes("wishlistItems"),
      });
    },
  });
};
