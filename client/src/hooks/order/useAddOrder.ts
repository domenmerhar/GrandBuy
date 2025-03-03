import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addOrder } from "../../api/order/addOrder";
import { useTranslation } from "react-i18next";

/**
 * useAddOrder hook za dodajanje naročila.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za dodajanje naročila.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: addOrderMutation } = useAddOrder();
 * addOrderMutation({ JWT: "your_jwt_token", cartItems: ["product_id_1", "product_id_2"] });
 */

export const useAddOrder = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: addOrder,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToAddToCart"), { id: "add-order" });

      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("cartItems"),
      });

      window.location.href = data?.session;
    },
  });
};
