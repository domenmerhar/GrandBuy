import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import createCouponSeller from "../../api/coupon/createCouponSeller";

export default function useCreateCouponSeller() {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: createCouponSeller,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), { id: "coupon" });

      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("coupon"),
      });
    },
  });
}
