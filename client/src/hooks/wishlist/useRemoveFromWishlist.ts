import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeFromWishlist } from "../../api/wishlist/removeFromWishlist";
import { useAuthContext } from "../../contexts/AuthContext";

export const useRemoveFromWishlist = (productId: string) => {
  const [{ userId }] = useAuthContext();
  const client = useQueryClient();

  return useMutation({
    mutationFn: removeFromWishlist,

    onMutate: () => {
      toast.loading("Removing from wishlist...", { id: "add-to-wishlist" });
    },

    onSettled: () => {
      client.invalidateQueries({
        queryKey: ["wishlistItem", userId, productId],
      });
      toast.success("Removed from wishlist", { id: "add-to-wishlist" });
    },
  });
};
