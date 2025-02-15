import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeFromWishlist } from "../../api/wishlist/removeFromWishlist";
import { useMe } from "../useMe";
import { useTranslation } from "react-i18next";

export const useRemoveFromWishlist = (productId: string) => {
  const { t } = useTranslation();
  const { data } = useMe();
  const client = useQueryClient();

  const userId = data?.data?._id;

  return useMutation({
    mutationFn: removeFromWishlist,

    onMutate: () => {
      toast.loading(t("removingFromWishlist"), { id: "add-to-wishlist" });
    },

    onSettled: () => {
      toast.success(t("removedFromWishlist"), { id: "add-to-wishlist" });

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
