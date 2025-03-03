import { useMutation } from "@tanstack/react-query";
import { requestSeller } from "../api/user/requestSeller";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

/**
 * useRequestSeller hook za pošiljanje zahteve za pridobitev statusa prodajalca.
 *
 * @returns {object} - Objekt, ki vsebuje `mutate` funkcijo za pošiljanje zahteve.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: request } = useRequestSeller();
 * request({ JWT: "your_jwt_token" });
 */

export const useRequestSeller = () => {
  const { t } = useTranslation();
  return useMutation({
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
};
