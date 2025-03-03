import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCartItem } from "../../api/cart/deleteCartItem";
import { useTranslation } from "react-i18next";

/**
 * useDeleteCartItem hook za brisanje izdelka iz košarice.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za brisanje izdelka iz košarice.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: deleteItem } = useDeleteCartItem();
 * deleteItem({ JWT: "your_jwt_token", productId: "product_id" });
 */

export const useDeleteCartItem = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,

    onMutate: () => {
      toast.loading(t("deletingCartItem"), { id: "delete-cart-item" });
    },

    onError() {
      toast.success(t("deletedCartItem"), { id: "delete-cart-item" });

      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("cart"),
      });
    },

    onSuccess: () => {
      return toast.error(t("failedToDeleteCartItem"), {
        id: "delete-cart-item",
      });
    },
  });
};
