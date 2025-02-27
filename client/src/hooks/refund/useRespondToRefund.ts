import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import respondToRefund from "../../api/refund/respondToRefund";

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
