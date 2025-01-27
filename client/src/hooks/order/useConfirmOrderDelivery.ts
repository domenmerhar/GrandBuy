import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";
import { confirmOrderDelivery } from "../../api/order/confirmOrderDelivery";
import { useSearchParams } from "react-router-dom";

export const useConfirmOrder = () => {
  const [searchParams] = useSearchParams();
  const [{ userId }] = useAuthContext();
  const client = useQueryClient();

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
