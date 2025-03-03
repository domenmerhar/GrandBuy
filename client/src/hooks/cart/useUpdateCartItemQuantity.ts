import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCartItemQuantity } from "../../api/cart/updateCartItemQuantity";
import { useTranslation } from "react-i18next";

/**
 * useUpdateCartItemQuantity hook za posodobitev količine izdelka v košarici.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za posodobitev količine izdelka.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: updateQuantity } = useUpdateCartItemQuantity();
 * updateQuantity({ JWT: "your_jwt_token", productId: "product_id", quantity: 5 });
 */

export const useUpdateCartItemQuantity = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,

    onMutate: () => {
      toast.loading(t("updatingQuantity"), { id: "update-cart-item" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToUpdateQuantity"), {
          id: "update-cart-item",
        });

      toast.success(t("updatedQuantity"), { id: "update-cart-item" });

      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("cartItems"),
      });
    },
  });
};
