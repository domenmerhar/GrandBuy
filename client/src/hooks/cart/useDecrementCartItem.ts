import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { decrementCartItem } from "../../api/cart/decrementCartItem";
import { useTranslation } from "react-i18next";

/**
 * useDecrementCartItem hook za zmanjšanje števila izdelkov v košarici.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za zmanjšanje števila izdelkov.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: decrement } = useDecrementCartItem();
 * decrement({ JWT: "your_jwt_token", productId: "product_id" });
 */

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
        predicate: (query) => String(query.queryKey[0]).includes("cartItems"),
      });
    },
  });
};
