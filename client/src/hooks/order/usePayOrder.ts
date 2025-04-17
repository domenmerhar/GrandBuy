import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { payOrder } from "../../api/order/payOrder";
import { useMe } from "../useMe";
import { useSearchParams } from "react-router-dom";

export const usePayOrder = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const client = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;

  const { data } = useMe();

  const userId = data?.data?._id;

  return useMutation({
    mutationFn: payOrder,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), { id: "add-order" });

      client.invalidateQueries({
        queryKey: ["orders", userId, page],
      });

      window.location.href = data?.session;
      console.log({ data });
    },
  });
};
