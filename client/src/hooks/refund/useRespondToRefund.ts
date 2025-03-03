import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import respondToRefund from "../../api/refund/respondToRefund";

/**
 * useRespondToRefund hook za odziv na zahtevo za vračilo.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za odziv na zahtevo za vračilo.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: respondRefund } = useRespondToRefund();
 * respondRefund({ JWT: "your_jwt_token", refundId: "refund_id", status: "accepted" });
 */

export const useRespondToRefund = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: respondToRefund,

    onSuccess: (data) => {
      console.log(data);

      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "respond-refund",
        });

      toast.success(t("success"), { id: "respond-refund" });

      client.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).includes("seller-refunds"),
      });
    },
  });
};
