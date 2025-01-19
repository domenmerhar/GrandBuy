import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist } from "../../api/wishlist/addToWishlist";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";

export const useAddToWishlist = (productId: string) => {
  const [{ userId }] = useAuthContext();
  const client = useQueryClient();

  return useMutation({
    mutationFn: addToWishlist,

    onMutate: () => {
      toast.loading("Adding to wishlist...", { id: "add-to-wishlist" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        toast.error("Failed to add to wishlist", { id: "add-to-wishlist" });

      toast.success("Added to wishlist", { id: "add-to-wishlist" });

      client.invalidateQueries({
        queryKey: ["wishlistItem", userId, productId],
      });
      client.invalidateQueries({
        queryKey: ["wishlistItemCount", userId],
      });
    },
  });
};
