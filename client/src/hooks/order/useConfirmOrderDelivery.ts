import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { confirmOrderDelivery } from "../../api/order/confirmOrderDelivery";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";
import { useTranslation } from "react-i18next";

/**
 * useConfirmOrder hook za potrditev dostave naročila.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za potrditev dostave naročila.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: confirmDelivery } = useConfirmOrder();
 * confirmDelivery({ JWT: "your_jwt_token", orderId: "order_id" });
 */

export const useConfirmOrder = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { data: userData } = useMe();
  const client = useQueryClient();

  const userId = userData?.data?._id;

  const page = Number(searchParams.get("page")) || 1;

  return useMutation({
    mutationFn: confirmOrderDelivery,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToConfirmDelivery"), {
          id: "confirm-order",
        });

      toast.success(t("deliveryConfirmed"), { id: "confirm-order" });

      client.invalidateQueries({
        queryKey: ["orders", userId, page],
      });
    },
  });
};
