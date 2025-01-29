import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { confirmOrderDelivery } from "../../api/order/confirmOrderDelivery";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../useMe";

export const useConfirmOrder = () => {
  const [searchParams] = useSearchParams();
  const { data: userData } = useMe();
  const client = useQueryClient();

  const userId = userData?.data?._id;

  const page = Number(searchParams.get("page")) || 1;

  return useMutation({
    mutationFn: confirmOrderDelivery,

    onSuccess: (data) => {
      console.log({ data });

      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed confirm delivery", {
          id: "confirm-order",
        });

      toast.success("Delivery confirmed", { id: "confirm-order" });

      client.invalidateQueries({
        queryKey: ["orders", userId, page],
      });
    },
  });
};
