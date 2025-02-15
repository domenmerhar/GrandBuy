import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCartItemQuantity } from "../../api/cart/updateCartItemQuantity";
import { useTranslation } from "react-i18next";

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
        predicate: (query) => query.queryKey[0].includes("cartItems"),
      });
    },
  });
};
