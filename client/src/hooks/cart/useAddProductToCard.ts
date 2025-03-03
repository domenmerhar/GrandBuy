import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProductToCart } from "../../api/cart/addProductToCard";
import { useTranslation } from "react-i18next";

/**
 * useAddProductToCard hook za dodajanje izdelka v košarico.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za dodajanje izdelka v košarico.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: addToCart } = useAddProductToCard();
 * addToCart({ JWT: "your_jwt_token", productId: "product_id", quantity: 1 });
 */

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
        predicate: (query) => String(query.queryKey[0]).includes("cart"),
      });
    },
  });
};
