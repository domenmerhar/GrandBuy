import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementCartItem } from "../../api/cart/incrementCartItem";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useIncrementCartItem = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: incrementCartItem,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToIncrementQuantity"), {
          id: "increment-cart-item",
        });

      client.invalidateQueries({
        predicate: (query) =>
          (query.queryKey[0] as string).includes("cartItems"),
      });
    },
  });
};
