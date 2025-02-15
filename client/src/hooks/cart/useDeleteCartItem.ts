import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCartItem } from "../../api/cart/deleteCartItem";
import { useTranslation } from "react-i18next";

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
        predicate: (query) => query.queryKey[0].includes("cart"),
      });
    },

    onSuccess: (data) => {
      return toast.error(t("failedToDeleteCartItem"), {
        id: "delete-cart-item",
      });
    },
  });
};
