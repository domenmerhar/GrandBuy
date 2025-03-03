import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shipOrder } from "../../api/order/shipOrder";

/**
 * useShipOrder hook za odpremo naročila.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za odpremo naročila.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: ship } = useShipOrder();
 * ship({ JWT: "your_jwt_token", orderId: "order_id" });
 */

export const useShipOrder = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: shipOrder,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToShipOrder"), { id: "handle-order" });

      client.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).includes("seller-orders"),
      });

      toast.success(t("orderShipped"), { id: "handle-order" });
    },
  });
};
