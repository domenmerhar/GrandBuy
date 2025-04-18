import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMe } from "../useMe";
import { useSearchParams } from "react-router-dom";
import { requestRefund } from "../../api/refund/requestRefund";
import { useTranslation } from "react-i18next";

/**
 * useRequestRefund hook za zahtevo vračila.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za zahtevo vračila.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: requestRefundMutation } = useRequestRefund();
 * requestRefundMutation({ JWT: "your_jwt_token", orderId: "order_id", reason: "reason_for_refund" });
 */

export const useRequestRefund = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const client = useQueryClient();
  const { data } = useMe();

  const userId = data?.data?._id;
  const page = Number(searchParams.get("page")) || 1;

  return useMutation({
    mutationFn: requestRefund,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToRequestRefund"), {
          id: "request-refund",
        });

      toast.success(t("refundRequested"), { id: "request-refund" });

      client.invalidateQueries({
        queryKey: ["orders", userId, page],
      });
    },
  });
};
