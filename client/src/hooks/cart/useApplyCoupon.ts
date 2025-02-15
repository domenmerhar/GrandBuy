import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCoupon } from "../../api/cart/applyCoupon";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useApplyCoupon = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: applyCoupon,

    onMutate: () => {
      toast.loading(t("applyingCoupon"), { id: "apply-coupon" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToApplyCoupon"), { id: "apply-coupon" });

      toast.success(t("appliedCoupon"), { id: "apply-coupon" });

      client.invalidateQueries({
        predicate: (query) =>
          (query.queryKey[0] as string).includes("cartItemsSummary") ||
          (query.queryKey[0] as string).includes("cartItems"),
      });
    },
  });
};
