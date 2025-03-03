import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import updateCouponSeller from "../../api/coupon/updateCouponSeller";

/**
 * useUpdateCouponSeller hook za posodobitev kupona prodajalca.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za posodobitev kupona.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: updateCoupon } = useUpdateCouponSeller();
 * updateCoupon({ JWT: "your_jwt_token", couponId: "coupon_id", couponData: { ... } });
 */

export default function useUpdateCouponSeller() {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateCouponSeller,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), { id: "coupon" });

      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("coupon"),
      });
    },
  });
}
