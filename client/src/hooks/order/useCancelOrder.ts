import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { cancelOrder } from "../../api/order/cancelOrder";

export const useCancelOrder = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), { id: "handle-order" });

      client.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).includes("seller-orders"),
      });

      toast.success(t("orderCancelled"), { id: "handle-order" });
    },
  });
};
