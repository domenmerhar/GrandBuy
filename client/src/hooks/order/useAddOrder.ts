import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addOrder } from "../../api/order/addOrder";
import { useTranslation } from "react-i18next";

export const useAddOrder = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: addOrder,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToAddToCart"), { id: "add-order" });

      client.invalidateQueries({
        predicate: (query) =>
          (query.queryKey[0] as string).includes("cartItems") ||
          query.queryKey[0] === "cartItemsCount",
      });

      window.location.href = data?.session;
    },
  });
};
