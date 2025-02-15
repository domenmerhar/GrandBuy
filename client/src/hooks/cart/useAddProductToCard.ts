import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProductToCart } from "../../api/cart/addProductToCard";
import { useTranslation } from "react-i18next";

export const useAddProductToCard = () => {
  const { t } = useTranslation();

  const client = useQueryClient();

  return useMutation({
    mutationFn: addProductToCart,

    onMutate: () => {
      toast.loading(t("addingToCart"), { id: "add-to-cart" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to add to cart", { id: "add-to-cart" });

      toast.success(t("addedToCart"), { id: "add-to-cart" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes("cart"),
      });
    },
  });
};
