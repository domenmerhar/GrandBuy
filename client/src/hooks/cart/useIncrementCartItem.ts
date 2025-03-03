import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementCartItem } from "../../api/cart/incrementCartItem";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

/**
 * useIncrementCartItem hook za povečanje števila izdelkov v košarici.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za povečanje števila izdelkov.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: increment } = useIncrementCartItem();
 * increment({ JWT: "your_jwt_token", productId: "product_id" });
 */

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
        predicate: (query) => String(query.queryKey[0]).includes("cartItems"),
      });
    },
  });
};
