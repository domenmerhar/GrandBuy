import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { decrementCartItem } from "../../api/cart/decrementCartItem";
import { useTranslation } from "react-i18next";

export const useDecrementCartItem = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: decrementCartItem,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "decrement-cart-item",
        });

      client.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes("cartItems"),
      });
    },
  });
};
