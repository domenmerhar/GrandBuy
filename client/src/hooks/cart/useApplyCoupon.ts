import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCoupon } from "../../api/cart/applyCoupon";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

/**
 * useApplyCoupon hook za uporabo kupona v košarici.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za uporabo kupona.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: apply } = useApplyCoupon();
 * apply({ JWT: "your_jwt_token", couponCode: "DISCOUNT10" });
 */

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
          String(query.queryKey[0]).includes("cartItemsSummary") ||
          String(query.queryKey[0]).includes("cartItems"),
      });
    },
  });
};
