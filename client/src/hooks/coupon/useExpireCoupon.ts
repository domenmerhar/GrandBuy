import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import expireCoupon from "../../api/coupon/expireCoupon";

/**
 * useExpireCoupon hook za iztekanje kupona.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za iztekanje kupona.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: expire } = useExpireCoupon();
 * expire({ JWT: "your_jwt_token", couponId: "coupon_id" });
 */

export default function useExpireCoupon() {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: expireCoupon,

    onSettled: (data) => {
      if (!data)
        return client.invalidateQueries({
          predicate: (query) =>
            String(query.queryKey[0]).includes("coupons-seller"),
        });

      return toast.error(t("somethingWentWrong"), { id: "coupon" });
    },
  });
}
