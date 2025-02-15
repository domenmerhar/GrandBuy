import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist } from "../../api/wishlist/addToWishlist";
import toast from "react-hot-toast";
import { useMe } from "../useMe";
import { useTranslation } from "react-i18next";

export const useAddToWishlist = (productId: string) => {
  const { t } = useTranslation();
  const { data } = useMe();
  const client = useQueryClient();

  const userId = data?.data?._id;

  return useMutation({
    mutationFn: addToWishlist,

    onMutate: () => {
      toast.loading(t("addingToWishlist"), { id: "add-to-wishlist" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToAddToWishlist"), {
          id: "add-to-wishlist",
        });

      toast.success(t("addedToWishlist"), { id: "add-to-wishlist" });

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
