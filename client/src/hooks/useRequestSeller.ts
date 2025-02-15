import { useMutation } from "@tanstack/react-query";
import { requestSeller } from "../api/user/requestSeller";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useRequestSeller = () => {
  const { t } = useTranslation();
  const { mutate } = useMutation({
    mutationFn: requestSeller,

    onMutate: () => toast.loading(t("sendingRequest"), { id: "requestSeller" }),

    onSuccess: (data) => {
      if (data?.status !== "success") {
        toast.error(t("somethingWentWrong"), {
          id: "requestSeller",
        });
        return;
      }

      toast.success(t("requestSent"), { id: "requestSeller" });
    },
  });

  return { mutate };
};
