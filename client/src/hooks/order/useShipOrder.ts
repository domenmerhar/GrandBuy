import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shipOrder } from "../../api/order/shipOrder";

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
          (query.queryKey[0] as string).includes("seller-orders") ||
          query.queryKey[0] === "seller-orders",
      });

      toast.success(t("orderShipped"), { id: "handle-order" });
    },
  });
};
